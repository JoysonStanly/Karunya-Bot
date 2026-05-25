import { Mail, Phone, MapPin } from "lucide-react";
import { contactInfo, siteConfig } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-heading text-xl font-bold">{siteConfig.name}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {siteConfig.tagline} — a NAAC A++ accredited deemed university focused on innovation, research, and values-based education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#about" className="block hover:text-maroon transition-colors duration-200 whitespace-nowrap">About Us</a>
              <a href="#courses" className="block hover:text-maroon transition-colors duration-200 whitespace-nowrap">Programs</a>
              <a href="#campus" className="block hover:text-maroon transition-colors duration-200 whitespace-nowrap">Campus Life</a>
              <a href="#placements" className="block hover:text-maroon transition-colors duration-200 whitespace-nowrap">Placements</a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-white mb-4">Programs</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Undergraduate Programs</p>
              <p>Postgraduate Programs</p>
              <p>Research Programs</p>
              <p>Lateral Entry Options</p>
            </div>
          </div>

          {/* Contact */}
          <div id="contact">
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-maroon flex-shrink-0" />
                {contactInfo.email}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-maroon flex-shrink-0" />
                {contactInfo.general}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-maroon flex-shrink-0" />
                {contactInfo.phone}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-maroon flex-shrink-0" />
                {contactInfo.address}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © 2026 {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}