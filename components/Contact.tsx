import React, { useState } from 'react';
import { SectionId } from '../types';
import { CONTACT_INFO } from '../constants';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // EmailJS Configuration
    // TODO: Create an account at https://www.emailjs.com/
    // 1. Create a Service (e.g., connect Gmail) -> Get Service ID
    // 2. Create a Template -> Get Template ID
    //    Map these variables in your template: {{name}}, {{email}}, {{phone}}, {{message}}, {{consent}}
    // 3. Get your Public Key from Account Settings
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    try {
      // Attempt to send via EmailJS
      if (SERVICE_ID !== 'YOUR_SERVICE_ID') {
         await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            {
               to_name: 'Raham Fayaz',
               from_name: formData.name,
               from_email: formData.email,
               phone: formData.phone,
               message: formData.message,
               consent: formData.consent ? 'Yes' : 'No'
            },
            PUBLIC_KEY
         );
         setStatus('success');
      } else {
         // If keys are not set up yet, throw error to trigger fallback
         throw new Error("EmailJS keys not configured");
      }
    } catch (error) {
       console.log("Direct email failed or not configured, falling back to mailto.", error);
       
       // Fallback to Mailto if EmailJS fails or isn't configured
       const subject = `New Website Lead: ${formData.name}`;
       const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}

Consent Provided: ${formData.consent ? 'Yes' : 'No'}
       `.trim();
   
       const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
       window.location.href = mailtoUrl;
       setStatus('success');
    }
    
    // Optional: Reset form after success
    // setFormData({ name: '', email: '', phone: '', message: '', consent: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-4 text-brand-dark">Message Sent!</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Thank you for reaching out. Raham has received your inquiry and will get back to you shortly to discuss your real estate needs.
                </p>
                <button 
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', phone: '', message: '', consent: false });
                  }}
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

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-gray-500 leading-snug cursor-pointer">
                    By providing your cellular telephone, you are consenting to allow Raham Fayaz Realtor to contact you with marketing communications via voice call, AI voice call, text message, or similar automated means. To opt out, you can reply 'stop' at any time or reply 'help' for assistance. Message and data rates may apply. Message frequency may vary. For more information see our Privacy Policy
                  </label>
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