import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ReviewForm from './ReviewForm';

const TestimonialsPage: React.FC = () => {
  const goHome = () => {
    window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'home' } }));
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={goHome}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-gold transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold text-brand-dark mb-4">Share Your Experience</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your feedback means the world to us. Please let us know about your experience buying or selling with RF Realty.
          </p>
        </div>

        {/* Form Section - Only the form is shown here now */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <ReviewForm />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;