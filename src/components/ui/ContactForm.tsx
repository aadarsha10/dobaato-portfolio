import React, { useState, useEffect } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: "Web Development",
    message: "",
  });
  const [status, setStatus] = useState({
    isSubmitting: false,
    error: null,
    success: false,
  });

  // Initialize EmailJS on component mount
  useEffect(() => {
    // Load EmailJS SDK
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.emailjs.init("NuRgvRmQJIjLmwC9G");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ...status, isSubmitting: true });

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        services: formData.services,
        message: formData.message,
        from_phone: formData.phone,
        to_name: "Dobaato Info Tech",
        to_email: "info@dobaato.com",
      };

      await window.emailjs.send(
        "service_d3pnvop",
        "template_mhn604v",
        templateParams
      );

      setStatus({
        isSubmitting: false,
        error: null,
        success: true,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        services: "",
        message: "",
        phone: "",
      });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setStatus({
        isSubmitting: false,
        error: "Failed to send message. Please try again.",
        success: false,
      });
    }
  };

  return (
    <div className="w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-normal text-gray-500 dark:text-gray-300 font-domine"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg bg-gray-200 py-2 px-3 dark:bg-[#1E293B] border-dark-100 text-gray-800 dark:text-white focus:ring-primary-500 focus:border-primary-500 font-manrope"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-normal text-gray-500 dark:text-gray-300 font-domine"
          >
            Phone Number
          </label>
          <input
            type="phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg bg-gray-200 py-2 px-3 dark:bg-[#1E293B] border-dark-100 text-gray-800 dark:text-white focus:ring-primary-500 focus:border-primary-500 font-manrope"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-normal text-gray-500 dark:text-gray-300 font-domine"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg bg-gray-200 py-2 px-3 dark:bg-[#1E293B] border-dark-100 text-gray-800 dark:text-white focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label
            htmlFor="services"
            className="block text-sm font-normal text-gray-500 dark:text-gray-300 font-domine"
          >
            Services
          </label>
          <select
            id="services"
            name="services"
            value={formData.services}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg bg-gray-200 py-2 px-3 dark:bg-[#1E293B] border-dark-100 text-gray-800 dark:text-white focus:ring-primary-500 focus:border-primary-500 font-manrope"
          >
            <option value="Web Development">Web Development</option>
            <option value="Mobile App Development">
              Mobile App Development
            </option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Content Writing">Content Writing</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-normal text-gray-500 dark:text-gray-300 font-domine"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
            className="mt-1 block w-full rounded-lg bg-gray-200 py-2 px-3 dark:bg-[#1E293B] border-dark-100 text-gray-800 dark:text-white focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {status.error && <p className="text-red-500 text-sm">{status.error}</p>}

        {status.success && (
          <p className="text-green-500 text-sm">Message sent successfully!</p>
        )}

        <button
          type="submit"
          disabled={status.isSubmitting}
          className="w-full px-6 py-3 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-domine"
        >
          {status.isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
