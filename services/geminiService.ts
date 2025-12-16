import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// --- API KEY CONFIGURATION ---
const MANUAL_API_KEY = "AIzaSyDsHXhRQR9W2NVcrohI5rSKoTxi37m4Bc4";
// -----------------------------

let aiClient: GoogleGenAI | null = null;

const getApiKey = (): string => {
  // 1. Check Manual Key (Highest Priority)
  if (MANUAL_API_KEY) return MANUAL_API_KEY;

  // 2. Check standard process.env (Node/Webpack/CRA)
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.API_KEY) return process.env.API_KEY;
    if (process.env.REACT_APP_API_KEY) return process.env.REACT_APP_API_KEY;
    if (process.env.VITE_API_KEY) return process.env.VITE_API_KEY;
  }
  
  // 3. Check import.meta.env (Vite/Modern Browsers)
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // @ts-ignore
    if (import.meta.env.API_KEY) return import.meta.env.API_KEY;
    // @ts-ignore
    if (import.meta.env.VITE_API_KEY) return import.meta.env.VITE_API_KEY;
  }

  return '';
};

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    const apiKey = getApiKey();
    aiClient = new GoogleGenAI({ apiKey: apiKey });
  }
  return aiClient;
};

// Define the tool for lead capture
const submitInquiryTool: FunctionDeclaration = {
  name: 'submit_inquiry',
  description: 'Submits the user\'s contact information and inquiry details to Raham Fayaz when they want to buy, sell, or get in touch.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: 'The name of the user.',
      },
      contact_info: {
        type: Type.STRING,
        description: 'The phone number or email address provided by the user.',
      },
      inquiry_type: {
        type: Type.STRING,
        description: 'What they are interested in (e.g., Buying, Selling, General Question).',
      },
    },
    required: ['name', 'contact_info'],
  },
};

export const sendMessageToGemini = async (
  message: string, 
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    const ai = getClient();
    
    if (!message || typeof message !== 'string') {
      return "I didn't catch that. Could you say it again?";
    }

    const formattedHistory = Array.isArray(history) 
      ? history.map(h => ({
          role: h.role,
          parts: [{ text: h.text || '' }]
        }))
      : [];

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ functionDeclarations: [submitInquiryTool] }],
      },
      history: formattedHistory
    });

    let result = await chat.sendMessage({
      message: message
    });

    // Handle Function Calls
    if (result.functionCalls && result.functionCalls.length > 0) {
      const call = result.functionCalls[0];
      if (call.name === 'submit_inquiry') {
        const { name, contact_info, inquiry_type } = call.args as any;
        
        // Logging for verification
        console.log(`Lead Captured: ${name}, ${contact_info}, ${inquiry_type}`);

        result = await chat.sendMessage({
          message: [{
            functionResponse: {
              name: 'submit_inquiry',
              id: call.id,
              response: { result: 'success', message: 'Inquiry sent successfully.' }
            }
          }]
        });
      }
    }

    const responseText = result.text;
    if (responseText) {
        return responseText;
    }
    
    return "I've noted that down. Is there anything else I can help you with?";

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    const errorMessage = error.message || error.toString();
    return `Connection Error: ${errorMessage}. Please check your internet connection or contact Raham directly.`;
  }
};