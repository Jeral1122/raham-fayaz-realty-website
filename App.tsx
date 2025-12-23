import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TestimonialsPage from './components/TestimonialsPage';
import ListingsPage from './components/ListingsPage';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'testimonials' | 'listings'>('home');

  // Listen for navigation events from the Header
  useEffect(() => {
    const handleViewChange = (e: CustomEvent<{ view: 'home' | 'testimonials' | 'listings', sectionId?: string }>) => {
      setView(e.detail.view);
      
      // If switching back to home and a section is specified, scroll to it
      if (e.detail.view === 'home' && e.detail.sectionId) {
        // We need a small delay to ensure the DOM is rendered before scrolling
        setTimeout(() => {
          const element = document.getElementById(e.detail.sectionId!);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('changeView' as any, handleViewChange);
    return () => window.removeEventListener('changeView' as any, handleViewChange);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <Header currentView={view} />
      <main>
        {view === 'home' && (
          <>
            <Hero />
            <About />
            {/* Listings section removed from home page as requested */}
            <Testimonials />
            <Contact />
          </>
        )}
        {view === 'testimonials' && <TestimonialsPage />}
        {view === 'listings' && <ListingsPage />}
      </main>
      <Footer />
    </div>
  );
};

export default App;