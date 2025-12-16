import React, { useState } from 'react';
import { SectionId } from '../types';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate network delay for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Log data to console for verification
    console.log("Form Submitted (Demo Mode):", formData);

    // Show success state
    setStatus('success');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id={SectionId.CONTACT} className="py-20 bg-brand-dark text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-2">Get In Touch</h2>
            <h3 className="text-4xl font-serif font-bold mb-6">Let's Discuss Your Real Estate Goals</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              If you’re ready to buy, sell, or explore the Metro Detroit real estate market, I’d love to help you get started. Your dream home is just a call or message away.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-brand-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Phone</p>
                  <p className="text-xl font-bold">{CONTACT_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-brand-gold">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Email</p>
                  <p className="text-xl font-bold">{CONTACT_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-brand-gold">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Serving</p>
                  <p className="text-xl font-bold">{CONTACT_INFO.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-2xl">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in-up">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for contacting RF Realty. Raham will be in touch with you shortly.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 mb-6">
                  <strong>Demo Mode:</strong> The form data was captured successfully but no email was sent.
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-brand-gold font-bold underline hover:text-amber-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-800">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all placeholder:text-gray-400"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-800">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all placeholder:text-gray-400"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-2 text-gray-800">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all placeholder:text-gray-400"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-2 text-gray-800">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all placeholder:text-gray-400"
                    placeholder="I am interested in buying a home in Canton..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`w-full bg-gradient-to-r from-brand-gold to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 tracking-wide ${status === 'sending' ? 'opacity-80 cursor-wait' : ''}`}
                >
                  {status === 'sending' ? (
                    <>Sending... <Loader2 className="animate-spin" size={18} /></>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;