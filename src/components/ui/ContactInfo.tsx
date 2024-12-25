import { MapPin, Phone, Mail, Clock, Handshake } from "lucide-react";
import linkdin from "../../assets/images/linkedin.png";
import Github from "../../assets/images/github.png";
export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4">
        <MapPin className="h-5 w-5 mt-1 text-[#0A45EC] flex-shrink-0" />
        <div>
          <h3 className="font-medium text-gray-500 dark:text-white mb-1">
            Visit Us
          </h3>
          <p className="text-gray-400">
            Ranibari 26, Samakhushi, Kathmandu, Nepal
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Phone className="h-5 w-5 mt-1 text-[#0A45EC] flex-shrink-0" />
        <div>
          <h3 className="font-medium text-gray-500 dark:text-white mb-1">
            Call Us
          </h3>
          <p className="text-gray-400">+977 9849088717, +977 9861495735</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Mail className="h-5 w-5 mt-1 text-[#0A45EC] flex-shrink-0" />
        <div>
          <h3 className="font-medium text-gray-500 dark:text-white mb-1">
            Email Us
          </h3>
          <p className="text-gray-400">hello@dobaato.com</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <Clock className="h-5 w-5 mt-1 text-[#0A45EC] flex-shrink-0" />
        <div>
          <h3 className="font-medium text-gray-500 dark:text-white mb-1">
            Working Hours
          </h3>
          <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM</p>
        </div>
      </div>
      {/* <div className="flex items-start gap-4">
        <Handshake className="h-5 w-5 mt-1 text-[#0A45EC] flex-shrink-0" />
        <div>
          <h3 className="font-medium text-gray-500 dark:text-white mb-1">
            Socials
          </h3>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.linkedin.com/company/dobaato/" target="_blank">
              <img src={linkdin} alt="linkdin" className="w-5" />
            </a>
            <a href="https://github.com/Dobaato" target="_blank">
              <img src={Github} alt="github" className="w-5" />
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
}
