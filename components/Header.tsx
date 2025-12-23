import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { SectionId } from '../types';

interface HeaderProps {
  currentView: 'home' | 'testimonials' | 'listings';
}

const Header: React.FC<HeaderProps> = ({ currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (id: SectionId) => {
    if (id === SectionId.TESTIMONIALS) {
      window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'testimonials' } }));
    } else if (id === SectionId.LISTINGS) {
      // Navigate to the dedicated Listings page
      window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'listings' } }));
    } else {
      window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'home', sectionId: id } }));
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', id: SectionId.HOME },
    { label: 'About', id: SectionId.ABOUT },
    { label: 'Listings', id: SectionId.LISTINGS },
    { label: 'Reviews', id: SectionId.TESTIMONIALS },
    { label: 'Contact', id: SectionId.CONTACT },
  ];

  // Determine if we should use the "solid" theme (white background, dark text)
  // This is active if the user has scrolled down OR if we are on a page other than Home
  const useSolidTheme = isScrolled || currentView !== 'home';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useSolidTheme ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigateTo(SectionId.HOME)}>
            <div className={`text-2xl font-serif font-bold tracking-wider border-2 px-3 py-1 ${
              useSolidTheme ? 'border-brand-dark text-brand-dark' : 'border-white text-white'
            }`}>
              RF <span className="text-brand-gold">REALTY</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`text-sm font-medium uppercase tracking-widest hover:text-brand-gold transition-colors ${
                  useSolidTheme ? 'text-gray-800' : 'text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a 
              href={`tel:${CONTACT_INFO.phone}`}
              className="bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Phone size={16} />
              {CONTACT_INFO.phone}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-brand-gold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id)}
              className="text-left text-gray-800 font-medium py-2 border-b border-gray-100"
            >
              {link.label}
            </button>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-2 text-brand-dark font-bold">
              <Phone size={18} className="text-brand-gold"/> {CONTACT_INFO.phone}
            </a>
            <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2 text-brand-dark font-bold">
              <Mail size={18} className="text-brand-gold"/> {CONTACT_INFO.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;