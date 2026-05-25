import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/content";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16">
        {/* Left: logo */}
        <div className="flex items-center flex-1">
          <a href="#hero" className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/dw6eye2af/image/upload/v1779628162/karunya_logo_cctv8a.png"
              alt="Karunya logo"
              className="h-10 w-auto object-contain"
            />
          </a>
        </div>

        {/* Center: desktop links */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}
              className="text-gray-700 hover:text-maroon transition-colors duration-200 text-sm font-medium whitespace-nowrap">
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Admissions button + mobile menu toggle */}
        <div className="flex items-center justify-end flex-1 gap-4">
          <a
            href="https://www.karunya.edu/"
            target="_blank"
            rel="noreferrer noopener"
            className="hidden md:inline-block bg-maroon text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-95"
            aria-label="Admissions - opens in new tab"
          >
            Admissions
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700" aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-maroon transition-colors duration-200 whitespace-nowrap">{link.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}