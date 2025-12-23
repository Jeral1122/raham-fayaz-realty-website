import React from 'react';
import { ArrowLeft, Home, Phone, Search } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const ListingsPage: React.FC = () => {
  const goHome = () => {
    window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'home' } }));
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={goHome}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-gold transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-brand-dark mb-4">Exclusive Properties</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse our curated selection of homes in Canton and Metro Detroit.
          </p>
        </div>

        {/* Coming Soon Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-4xl mx-auto text-center">
          <div className="bg-brand-dark py-16 px-6 relative overflow-hidden">
             {/* Decorative Background Pattern */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             <div className="relative z-10">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm text-brand-gold">
                    <Home size={40} />
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Coming Soon</h2>
                <p className="text-xl text-gray-300 max-w-lg mx-auto leading-relaxed">
                    We are currently updating our portfolio with the latest market opportunities.
                </p>
             </div>
          </div>

          <div className="p-10 md:p-14">
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Looking for something specific?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                While we prepare our online listings, Raham has access to both on-market and off-market properties that match your criteria. Don't wait for the website—get the list today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="inline-flex items-center justify-center gap-2 bg-brand-gold text-white font-bold px-8 py-4 rounded-full hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                    <Phone size={20} />
                    Call for Listings
                </a>
                <a 
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="inline-flex items-center justify-center gap-2 border-2 border-brand-dark text-brand-dark font-bold px-8 py-4 rounded-full hover:bg-brand-dark hover:text-white transition-all"
                >
                    <Search size={20} />
                    Request Property Search
                </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ListingsPage;