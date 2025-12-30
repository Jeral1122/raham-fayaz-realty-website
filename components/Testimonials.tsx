import React, { useState, useEffect } from 'react';
import { SectionId, Review } from '../types';
import { Star, PlusCircle, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          // Log the full error for debugging
          console.error('Supabase fetch error:', error);
          setFetchError(error.message);
        } else if (data) {
          setReviews(data);
          setFetchError(null);
        }
      } catch (err: any) {
        console.error('Unexpected error:', err);
        setFetchError(err.message || 'Failed to connect to reviews database');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
    
    // Listen for real-time updates or local submission events to refresh
    window.addEventListener('reviewSubmitted', fetchReviews);
    return () => window.removeEventListener('reviewSubmitted', fetchReviews);
  }, []);

  const goToReviewPage = () => {
    window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'testimonials' } }));
  };

  // If loading, show loader
  if (isLoading) {
    return (
        <section id={SectionId.TESTIMONIALS} className="py-24 bg-white flex justify-center">
            <Loader2 className="animate-spin text-brand-gold" size={40} />
        </section>
    );
  }

  // If there was an error, showing it might be helpful during development, 
  // but in production we might want to hide it or show a fallback.
  if (fetchError && reviews.length === 0) {
     return (
        <section id={SectionId.TESTIMONIALS} className="py-24 bg-white flex flex-col items-center justify-center gap-4">
             <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                <AlertCircle size={20} />
                <p>Unable to load reviews: {fetchError}</p>
             </div>
             <p className="text-gray-500 text-sm">Please check your database connection and API keys.</p>
        </section>
     );
  }

  return (
    <section id={SectionId.TESTIMONIALS} className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        
        {/* Standardized Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-2">Client Stories</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">What people are saying</h3>
        </div>

        {reviews.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-8 animate-fade-in-up">
             <p className="text-gray-500 text-xl font-light mb-8 italic">No reviews yet.</p>
             <button 
                onClick={goToReviewPage}
                className="inline-flex items-center gap-2 bg-brand-gold text-white font-bold px-8 py-3 rounded-full hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
             >
                <PlusCircle size={20} />
                Write a Review
             </button>
          </div>
        ) : (
          <>
            {/* Reviews List */}
            <div className="space-y-16 text-left max-w-4xl mx-auto">
              {reviews.map((item) => (
                <div key={item.id} className="animate-fade-in-up border-b border-gray-200 pb-12 last:border-0 last:pb-0">
                  
                  {/* Title */}
                  <h3 className="text-3xl font-serif text-gray-900 mb-3">
                    {item.title}
                  </h3>

                  {/* Stars */}
                  <div className="flex text-amber-500 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={22} 
                        fill={i < item.rating ? "currentColor" : "none"} 
                        className="mr-1"
                      />
                    ))}
                  </div>

                  {/* Message */}
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 font-sans">
                    {item.quote}
                  </p>

                  {/* Name */}
                  <div className="text-gray-900 font-medium text-lg">
                    {item.name}
                  </div>

                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;