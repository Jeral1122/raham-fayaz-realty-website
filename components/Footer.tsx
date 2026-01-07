import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { SectionId } from '../types';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const handleNavClick = (id: SectionId) => {
    if (id === SectionId.TESTIMONIALS) {
        window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'testimonials' } }));
    } else if (id === SectionId.LISTINGS) {
        window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'listings' } }));
    } else {
        window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'home', sectionId: id } }));
    }
  };

  const handlePrivacyClick = () => {
    window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'privacy' } }));
    window.scrollTo(0, 0);
  };

  const handleTermsClick = () => {
    window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'terms' } }));
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div>
            <div className="mb-4 cursor-pointer" onClick={() => handleNavClick(SectionId.HOME)}>
              <div className="inline-block text-2xl font-serif font-bold tracking-wider border-2 border-white text-white px-3 py-1">
                RF <span className="text-brand-gold">REALTY</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Helping buyers and sellers across Canton and Metro Detroit achieve their real estate goals with honesty and integrity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 border-l-4 border-brand-gold pl-3">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleNavClick(SectionId.HOME)} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => handleNavClick(SectionId.ABOUT)} className="hover:text-white transition-colors">About Raham</button></li>
              <li><button onClick={() => handleNavClick(SectionId.LISTINGS)} className="hover:text-white transition-colors">Properties</button></li>
              <li><button onClick={() => handleNavClick(SectionId.TESTIMONIALS)} className="hover:text-white transition-colors">Reviews</button></li>
              <li><button onClick={() => handleNavClick(SectionId.CONTACT)} className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 border-l-4 border-brand-gold pl-3">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>{CONTACT_INFO.name}</li>
              <li><a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-brand-gold">{CONTACT_INFO.phone}</a></li>
              <li><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brand-gold">{CONTACT_INFO.email}</a></li>
              <li>{CONTACT_INFO.location}</li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-bold mb-4 border-l-4 border-brand-gold pl-3">Follow</h4>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Brokerage Compliance Section */}
        <div className="border-t border-gray-800 py-8">
            <div className="bg-gray-800/50 rounded-lg p-6 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left border border-gray-700 max-w-4xl mx-auto">
                <a 
                  href="https://www.clientsfirstrealtors.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white rounded-lg flex-shrink-0 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 block"
                >
                    <img 
                       src="https://res.cloudinary.com/df8hl8izr/image/upload/v1767355313/WhatsApp_Image_2025-12-31_at_18.51.03_k6wyna.jpg"
                       alt="Clients First Realtors"
                       className="h-32 md:h-48 w-auto object-contain"
                    />
                </a>
                
                <div className="hidden md:block w-px h-24 bg-gray-600"></div>

                <div className="space-y-2 text-gray-300">
                    <h5 className="font-bold text-white text-xl">Clients First, Realtors</h5>
                    <p className="text-base">43050 Ford Rd. Ste 130 Canton , MI 48187</p>
                    <p className="text-base">
                        <a href="tel:734-981-2900" className="hover:text-brand-gold transition-colors font-semibold">734-981-2900</a>
                    </p>
                </div>
            </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-2 mb-4 md:mb-0">
             <p>&copy; {new Date().getFullYear()} {CONTACT_INFO.brandName}. All rights reserved.</p>
             <span className="hidden md:inline text-gray-700">|</span>
             <a 
                href="https://geosolutions.com.pk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-brand-gold transition-colors font-medium"
             >
                Powered by Geo Solutions
             </a>
          </div>
          <div className="space-x-4">
            <button onClick={handlePrivacyClick} className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</button>
            <button onClick={handleTermsClick} className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;