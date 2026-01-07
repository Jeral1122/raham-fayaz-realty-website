import React from 'react';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const goHome = () => {
    window.dispatchEvent(new CustomEvent('changeView', { detail: { view: 'home' } }));
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={goHome}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-gold transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Introduction</h2>
              <p>Welcome to rahamfayaz.com, operated by Raham Fayaz Realty. We respect your privacy and are committed to protecting any personal information you share with us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Information We Collect</h2>
              <h3 className="font-bold mb-2">Personal Information</h3>
              <p>We may collect personal information you voluntarily provide, including:</p>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Property preferences or inquiry details</li>
              </ul>
              
              <h3 className="font-bold mb-2">Automatically Collected Information</h3>
              <p>When you visit our website, we may automatically collect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>IP address</li>
                <li>Browser and device information</li>
                <li>Pages visited and time spent on the site</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Respond to inquiries and provide real estate services</li>
                <li>Send property listings, market updates, or newsletters (you may opt out at any time)</li>
                <li>Improve website performance and user experience</li>
                <li>Comply with legal requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Sharing Your Information</h2>
              <p>We do not sell your personal information. We may share information with trusted service providers (such as website hosting, CRM, or email platforms) or as required by law.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Cookies</h2>
              <p>This website uses cookies to enhance user experience and analyze traffic. You can disable cookies through your browser settings, though some features may not function properly.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Data Security</h2>
              <p>We use reasonable security measures to protect your personal information. However, no internet transmission is completely secure.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Your Choices</h2>
              <p>You may:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Opt out of marketing emails</li>
                <li>Request access, correction, or deletion of your personal information</li>
              </ul>
              <p className="mt-2">To exercise these rights, contact us using the information below.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Third-Party Links</h2>
              <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Policy Updates</h2>
              <p>We may update this Privacy Policy at any time. Changes will be posted on this page with a revised effective date.</p>
            </section>

            <section className="border-t border-gray-200 pt-6 mt-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact:</p>
              <div className="mt-4">
                <p className="font-bold">Raham Fayaz</p>
                <p>Email: <a href="mailto:rahamfayaz.realtor@gmail.com" className="text-brand-gold hover:underline">rahamfayaz.realtor@gmail.com</a></p>
                <p>Phone: <a href="tel:2482381703" className="text-brand-gold hover:underline">248-238-1703</a></p>
                <p>Location: Canton, MI</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;