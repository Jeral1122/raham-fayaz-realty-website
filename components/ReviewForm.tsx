import React, { useState } from 'react';
import { SectionId } from '../types';
import { Star, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

const ReviewForm: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    review: '',
    name: '',
    email: '',
    isGenuine: false
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert("Please select a star rating.");
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
        const { error } = await supabase
            .from('reviews')
            .insert([
                {
                    name: formData.name,
                    title: formData.title,
                    quote: formData.review,
                    rating: rating,
                    role: 'Client',
                    date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                    is_genuine: formData.isGenuine
                }
            ]);

        if (error) {
            console.error('Supabase insert error:', error);
            throw new Error(error.message || 'Database error occurred');
        }

        setStatus('success');
        setFormData({ title: '', review: '', name: '', email: '', isGenuine: false });
        setRating(0);
        
        // Notify other components
        window.dispatchEvent(new CustomEvent('reviewSubmitted'));

    } catch (error: any) {
        console.error('Error submitting review:', error);
        setStatus('error');
        setErrorMessage(error.message || 'Failed to submit review. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Determine if a field is valid
  const isFieldValid = (field: string) => {
    if (field === 'rating') return rating > 0;
    if (field === 'title') return formData.title.trim().length > 0;
    if (field === 'review') return formData.review.trim().length > 0;
    if (field === 'name') return formData.name.trim().length > 0;
    if (field === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    return true; 
  };

  // Helper to generate input classes based on validation state
  const getInputClass = (fieldName: string) => {
    const isValid = isFieldValid(fieldName);
    const baseClass = "w-full px-4 py-3 bg-white text-gray-900 border rounded-md focus:outline-none focus:ring-1 transition-all placeholder:text-gray-400";
    
    return isValid 
      ? `${baseClass} border-gray-300 focus:border-brand-gold focus:ring-brand-gold`
      : `${baseClass} border-red-300 focus:border-red-500 focus:ring-red-200`;
  };

  if (status === 'success') {
    return (
      <div className="p-12 text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-serif font-bold mb-4 text-brand-dark">Review Submitted!</h3>
        <p className="text-gray-600 mb-8 text-lg">
          Thank you for sharing your experience! Your review has been added to the home page.
        </p>
        <button 
          onClick={() => {
            setStatus('idle');
            window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'home', sectionId: SectionId.TESTIMONIALS } }));
          }}
          className="bg-brand-gold text-white px-8 py-3 rounded-full font-bold hover:bg-amber-700 transition-colors"
        >
          See My Review
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12">
      {status === 'error' && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-3">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Rating */}
        <div>
          <label className="block text-gray-700 font-bold mb-2 text-sm">
            Your overall rating {!isFieldValid('rating') && <span className="text-red-500 text-lg ml-1" title="Required">*</span>}
          </label>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <button
                  type="button"
                  key={starValue}
                  className="focus:outline-none transition-transform hover:scale-110"
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    size={32}
                    className={`${
                      starValue <= (hover || rating) ? 'text-brand-gold fill-brand-gold' : 'text-gray-300'
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2 text-sm">
            Title of your review {!isFieldValid('title') && <span className="text-red-500 text-lg ml-1" title="Required">*</span>}
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Summarize your experience"
            className={getInputClass('title')}
          />
        </div>

        {/* Review */}
        <div>
          <label htmlFor="review" className="block text-gray-700 font-bold mb-2 text-sm">
            Your review {!isFieldValid('review') && <span className="text-red-500 text-lg ml-1" title="Required">*</span>}
          </label>
          <textarea
            id="review"
            name="review"
            rows={6}
            required
            value={formData.review}
            onChange={handleChange}
            placeholder="Tell us about your experience working with RF Realty..."
            className={`${getInputClass('review')} resize-none`}
          ></textarea>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="form-name" className="block text-gray-700 font-bold mb-2 text-sm">
            Your name {!isFieldValid('name') && <span className="text-red-500 text-lg ml-1" title="Required">*</span>}
          </label>
          <input
            type="text"
            id="form-name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={getInputClass('name')}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="form-email" className="block text-gray-700 font-bold mb-2 text-sm">
            Your email {!isFieldValid('email') && <span className="text-red-500 text-lg ml-1" title="Valid email required">*</span>}
          </label>
          <input
            type="email"
            id="form-email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={getInputClass('email')}
          />
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center gap-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="isGenuine"
              checked={formData.isGenuine}
              onChange={handleChange}
              className="sr-only peer"
              required
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          <span className="text-gray-700 text-sm">
            This review is based on my own experience and is my genuine opinion. <span className="text-red-500">*</span>
          </span>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-[#2563eb] hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors shadow-sm w-full md:w-auto flex justify-center items-center gap-2"
        >
          {status === 'submitting' ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Submitting...
              </>
          ) : (
              'Submit Review'
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;