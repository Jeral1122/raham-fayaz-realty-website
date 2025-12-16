import React from 'react';
import { SectionId } from '../types';
import { TESTIMONIALS_DATA } from '../constants';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section id={SectionId.TESTIMONIALS} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-2">Client Success Stories</h2>
          <h3 className="text-4xl font-serif font-bold text-brand-dark">What Our Clients Say</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <div key={item.id} className="bg-slate-50 p-8 rounded-sm relative group hover:-translate-y-1 transition-transform duration-300 shadow-sm border border-slate-100">
              <Quote className="text-brand-gold/20 absolute top-6 right-6" size={48} />
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold"
                />
                <div>
                  <h4 className="font-bold text-brand-dark font-serif">{item.name}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">{item.role}</p>
                </div>
              </div>
              
              <p className="text-gray-600 italic leading-relaxed relative z-10">
                "{item.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;