import React from 'react';
import { SectionId } from '../types';
import { HERO_CONTENT } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id={SectionId.HOME} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Fixed Background Image with Overlay - bg-fixed disabled on mobile to prevent z-index glitches */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2000&auto=format&fit=crop")' 
        }}
      >
        <div className="absolute inset-0 bg-brand-dark/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
        <p className="text-brand-gold font-bold tracking-[0.2em] uppercase mb-4 animate-fade-in-up">
          Raham Fayaz Realty
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight animate-fade-in-up animate-delay-200">
          Your Trusted Metro Detroit <br/>
          <span className="italic text-gray-300">Real Estate Expert</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up animate-delay-500">
          {HERO_CONTENT.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-700">
          <button 
            onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-4 rounded-full text-lg font-bold tracking-wide transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-amber-600/20"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;