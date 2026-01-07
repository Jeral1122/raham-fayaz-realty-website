import React from 'react';
import { ArrowLeft } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-8">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Acceptance of Terms</h2>
              <p>By using rahamfayaz.com, you agree to these Terms of Service. If you do not agree, please discontinue use of the website.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Website Purpose</h2>
              <p>This website provides general information about real estate services and property listings. All content is for informational purposes only and does not constitute legal, financial, or real estate advice.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">No Agency Relationship</h2>
              <p>Use of this website does not create an agency or client relationship unless confirmed in writing.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Accuracy of Information</h2>
              <p>Property listings, pricing, availability, and market information may change at any time. We do not guarantee accuracy or completeness.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">User Conduct</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use the website for unlawful purposes</li>
                <li>Submit false or misleading information</li>
                <li>Attempt to interfere with website security or functionality</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Intellectual Property</h2>
              <p>All content on this website, including text, images, logos, and branding, is owned by Raham Fayaz Realty and may not be copied without permission.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Third-Party Services</h2>
              <p>This website may include third-party tools such as MLS listings or maps. We are not responsible for their content or performance.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Limitation of Liability</h2>
              <p>We are not liable for any damages resulting from your use of this website or reliance on its content.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Indemnification</h2>
              <p>You agree to indemnify and hold harmless Raham Fayaz Realty from claims arising from your use of this website.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Governing Law</h2>
              <p>These Terms are governed by the laws of the State of Michigan.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Changes to Terms</h2>
              <p>We may update these Terms at any time. Continued use of the website constitutes acceptance of the updated Terms.</p>
            </section>

            <section className="border-t border-gray-200 pt-6 mt-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">Contact Us</h2>
              <p>For questions about these Terms, please contact:</p>
              <div className="mt-4">
                <p className="font-bold">Raham Fayaz</p>
                <p>Email: <a href="mailto:rahamfayaz.realtor@gmail.com" className="text-brand-gold hover:underline">rahamfayaz.realtor@gmail.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;