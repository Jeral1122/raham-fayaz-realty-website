import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Listings from './components/Listings';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <Header />
      <main>
        <Hero />
        <About />
        <Listings />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;