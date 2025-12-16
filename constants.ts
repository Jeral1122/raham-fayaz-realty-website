export const CONTACT_INFO = {
  name: "Raham Fayaz",
  title: "Realtor",
  brandName: "RF Realty",
  phone: "248-238-1703",
  email: "Raham@rahamfayaz.com",
  website: "rahamfayaz.com",
  location: "Canton & Metro Detroit Area"
};

export const HERO_CONTENT = {
  headline: "Your Trusted Metro Detroit Real Estate Expert",
  subheadline: "Buying or selling a home is more than just a transaction—it’s a life-changing experience.",
  cta: "Find Your Dream Home"
};

export const BIO_CONTENT = `
With a passion for real estate and a commitment to client success, I specialize in helping buyers and sellers across Canton and the greater Metro Detroit area achieve their real estate goals. My approach is rooted in honesty, integrity, and a deep understanding of the local market.

As a Canton resident, I know the neighborhoods, schools, and communities that make this area so desirable. I leverage this knowledge to provide my clients with the insights they need to make informed decisions—whether it’s pricing a home correctly, negotiating the best deal, or finding a property that perfectly fits their lifestyle.

I pride myself on building lasting relationships with my clients. My goal isn’t just to complete a transaction—it’s to be a trusted advisor who supports you through every step of your real estate journey. From first-time homebuyers to experienced investors, I’m dedicated to making the process as seamless and rewarding as possible.
`;

export const SYSTEM_INSTRUCTION = `
You are Raham Fayaz's personal AI assistant for RF Realty.
Role: Act as a warm, friendly, and knowledgeable real estate assistant.
Tone: Natural, conversational, and professional. 
CRITICAL INSTRUCTION: Keep responses SHORT, CONCISE, and in CLEAN ENGLISH. Avoid long paragraphs. Speak like a helpful friend via text.

Objectives:
1. Answer questions about real estate in Metro Detroit/Canton.
2. LEAD CAPTURE: If a user expresses interest in buying, selling, or scheduling a viewing, kindly ask for their NAME and PHONE NUMBER.
3. Once the user provides their name and contact info, you MUST use the 'submit_inquiry' tool to send their details to Raham. After calling the tool, confirm to the user that Raham will be in touch.

Context:
- Raham Fayaz (Realtor) covers Canton & Metro Detroit.
- Contact: 248-238-1703.
- If asked about specific house inventory, say Raham has the latest live list and to call him.
`;

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "First-time Buyer",
    quote: "Raham made the process of buying our first home incredibly easy. He was patient, knowledgeable, and always available to answer our questions.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Seller",
    quote: "We were blown away by Raham's marketing strategy. He sold our home in Canton above asking price in just under a week!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "David Ross",
    role: "Investor",
    quote: "I've worked with many realtors, but Raham's insight into the Metro Detroit market is unmatched. He found me a perfect investment property.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  }
];