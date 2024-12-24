import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4">
        <MapPin className="h-6 w-6 text-gray-400 dark:text-[#0A45EC] flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-gray-500 dark:text-white mb-1">Visit Us</h3>
          <p className="text-gray-400">123 Innovation Street, Tech Valley, CA 94043</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Phone className="h-6 w-6 text-gray-400 dark:text-[#0A45EC] flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-gray-500 dark:text-white mb-1">Call Us</h3>
          <p className="text-gray-400">+1 (555) 123-4567</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Mail className="h-6 w-6 text-gray-400 dark:text-[#0A45EC] flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-gray-500 dark:text-white mb-1">Email Us</h3>
          <p className="text-gray-400">contact@dobaato.com</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Clock className="h-6 w-6 text-gray-400 dark:text-[#0A45EC] flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-gray-500 dark:text-white mb-1">Working Hours</h3>
          <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM</p>
        </div>
      </div>
    </div>
  );
}