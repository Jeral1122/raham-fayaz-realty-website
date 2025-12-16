import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    // Safely access process.env.API_KEY
    // We check multiple potential sources for the key to be robust
    const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';
    
    // If no key is found, we don't throw yet, we let the client try to initialize 
    // so the specific SDK error can be caught later if it fails.
    aiClient = new GoogleGenAI({ apiKey });
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
    const candidates = result.candidates;
    if (candidates && candidates.length > 0) {
        const parts = candidates[0].content?.parts;
        if (parts) {
            const functionCalls = parts.filter(part => part.functionCall);
            if (functionCalls.length > 0) {
              const call = functionCalls[0].functionCall;
              if (call && call.name === 'submit_inquiry') {
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
        }
    }

    const responseText = result.text;
    if (responseText) {
        return responseText;
    }
    
    return "I've noted that down. Is there anything else I can help you with?";

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Extract the exact error message to help user debug
    const errorMessage = error.message || error.toString();
    
    // Check for specific API Key error
    if (errorMessage.includes("API key")) {
        return "System Error: The API Key is invalid or missing. Please check your Vercel Environment Variables.";
    }
    
    // Return the actual error message so we know what's wrong
    return `Connection Error: ${errorMessage}. Please contact Raham directly at 248-238-1703.`;
  }
};