import { useState } from 'react';
import { useContactForm } from '../../hooks/useContactForm';

export default function ContactForm() {
  const { handleSubmit, isSubmitting, error, success } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-normal text-gray-500 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-lg bg-gray-200 py-2 px-3 dark:bg-[#1E293B]  border-dark-100 text-gray-800 dark:text-white focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-normal text-gray-500 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-lg bg-gray-200 py-2 px-3 dark:bg-[#1E293B]  border-dark-100 text-gray-800 dark:text-white focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-normal text-gray-500 dark:text-gray-300">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="mt-1 block w-full rounded-lg bg-gray-200 py-2 px-3 dark:bg-[#1E293B]  border-dark-100 text-gray-800 dark:text-white focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-normal text-gray-500 dark:text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-1 block w-full rounded-lg bg-gray-200 py-2 px-3 dark:bg-[#1E293B]  border-dark-100 text-gray-800 dark:text-white focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {success && (
        <p className="text-green-500 text-sm">Message sent successfully!</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}