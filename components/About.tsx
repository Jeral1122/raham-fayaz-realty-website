import React from 'react';
import { SectionId } from '../types';
import { BIO_CONTENT, CONTACT_INFO } from '../constants';
import { MapPin, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  // Process bio into paragraphs
  const paragraphs = BIO_CONTENT.split('\n').filter(p => p.trim() !== '');

  // Using the hosted Cloudinary URL provided
  const profileImageUrl = "https://res.cloudinary.com/df8hl8izr/image/upload/v1766078567/raham-fayaz.jpg_igaaus.jpg";

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.ABOUT} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-brand-gold rounded-sm z-0"></div>
            
            <img 
              src={profileImageUrl}
              alt={CONTACT_INFO.name} 
              className="relative w-full h-[500px] object-cover object-center rounded-sm shadow-xl z-10 transition-all duration-500 bg-gray-100"
            />

            <div className="absolute bottom-10 right-[-20px] bg-brand-dark text-white p-6 shadow-lg z-20 max-w-xs">
              <p className="font-serif text-2xl italic">"Honesty, integrity, and a deep understanding of the local market."</p>
            </div>
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2">
            <h2 className="text-brand-gold font-bold tracking-widest text-sm mb-2 italic">Meet your Real estate agent</h2>
            <h3 className="text-5xl md:text-6xl font-serif font-bold text-brand-dark mb-6">Raham Fayaz</h3>
            
            <div className="space-y-4 text-gray-600 leading-relaxed font-sans text-lg">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-brand-gold" />
                <span className="font-bold text-brand-dark">Canton Resident</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-brand-gold" />
                <span className="font-bold text-brand-dark">Market Expert</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-brand-gold" />
                <span className="font-bold text-brand-dark">Skilled Negotiator</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-brand-gold" />
                <span className="font-bold text-brand-dark">Personalized Service</span>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">
                If you’re ready to buy, sell, or explore the Metro Detroit real estate market, I’d love to help you get started. Your dream home is just a call or message away.
              </p>
              <a 
                href={`#${SectionId.CONTACT}`}
                onClick={scrollToContact}
                className="inline-block border-b-2 border-brand-gold text-brand-gold font-bold pb-1 hover:text-amber-700 hover:border-amber-700 transition-colors text-2xl cursor-pointer"
              >
                Let's Connect &rarr;
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;