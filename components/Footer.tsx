import React from 'react';
import { CONTACT_INFO } from '../constants';
import { SectionId } from '../types';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div>
            <div className="mb-4 cursor-pointer" onClick={() => document.getElementById(SectionId.HOME)?.scrollIntoView({ behavior: 'smooth'})}>
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
              <li><button onClick={() => document.getElementById(SectionId.HOME)?.scrollIntoView({ behavior: 'smooth'})} className="hover:text-white transition-colors">Home</button></li>
              <li><button onClick={() => document.getElementById(SectionId.ABOUT)?.scrollIntoView({ behavior: 'smooth'})} className="hover:text-white transition-colors">About Raham</button></li>
              <li><button onClick={() => document.getElementById(SectionId.LISTINGS)?.scrollIntoView({ behavior: 'smooth'})} className="hover:text-white transition-colors">Properties</button></li>
              <li><button onClick={() => document.getElementById(SectionId.TESTIMONIALS)?.scrollIntoView({ behavior: 'smooth'})} className="hover:text-white transition-colors">Testimonials</button></li>
              <li><button onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth'})} className="hover:text-white transition-colors">Contact</button></li>
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
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} {CONTACT_INFO.brandName}. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;