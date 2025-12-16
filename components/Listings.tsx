import React from 'react';
import { SectionId } from '../types';
import { Bed, Bath, Square, ArrowRight } from 'lucide-react';

const LISTINGS = [
  {
    id: 1,
    title: 'Modern Canton Estate',
    price: '$549,000',
    address: '123 Maple Avenue, Canton, MI',
    beds: 4,
    baths: 3,
    sqft: 2800,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Luxury Downtown Condo',
    price: '$325,000',
    address: '450 Woodward Ave, Detroit, MI',
    beds: 2,
    baths: 2,
    sqft: 1400,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Suburban Family Home',
    price: '$410,000',
    address: '789 Oak Lane, Plymouth, MI',
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop'
  }
];

const Listings: React.FC = () => {
  return (
    <section id={SectionId.LISTINGS} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-2">Exclusive Properties</h2>
          <h3 className="text-4xl font-serif font-bold text-brand-dark">Featured Listings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LISTINGS.map((item) => (
            <div key={item.id} className="bg-white group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100">
              <div className="relative overflow-hidden h-64">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-brand-gold text-white px-3 py-1 text-sm font-bold rounded-full shadow-md">
                  FOR SALE
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-brand-dark font-serif group-hover:text-brand-gold transition-colors">{item.title}</h4>
                  <p className="text-brand-gold font-bold text-lg">{item.price}</p>
                </div>
                <p className="text-gray-500 mb-6 text-sm">{item.address}</p>
                
                <div className="flex justify-between border-t border-gray-100 pt-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Bed size={16} /> {item.beds} Beds
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath size={16} /> {item.baths} Baths
                  </div>
                  <div className="flex items-center gap-1">
                    <Square size={16} /> {item.sqft} sqft
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 border-2 border-brand-dark text-brand-dark px-10 py-3 rounded-full hover:bg-brand-dark hover:text-white transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 font-bold tracking-wide">
            View All Properties <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Listings;