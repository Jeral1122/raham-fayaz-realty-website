import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    // Safely access process.env.API_KEY
    // In some browser environments 'process' might be undefined, so we check typeof first.
    const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';
    
    if (!apiKey) {
      console.warn("Gemini API Key is missing. Please check your environment variables.");
    }
    
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
    
    // Validate message
    if (!message || typeof message !== 'string') {
      return "I didn't catch that. Could you say it again?";
    }

    // Safely map history
    const formattedHistory = Array.isArray(history) 
      ? history.map(h => ({
          role: h.role,
          parts: [{ text: h.text || '' }]
        }))
      : [];

    // Create chat with tool configuration
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ functionDeclarations: [submitInquiryTool] }],
      },
      history: formattedHistory
    });

    // Send the message
    let result = await chat.sendMessage({
      message: message
    });

    // Handle Function Calls (if the model decides to capture a lead)
    const candidates = result.candidates;
    if (candidates && candidates.length > 0) {
        const parts = candidates[0].content?.parts;
        if (parts) {
            const functionCalls = parts.filter(part => part.functionCall);
            if (functionCalls.length > 0) {
              const call = functionCalls[0].functionCall;
              if (call && call.name === 'submit_inquiry') {
                const { name, contact_info, inquiry_type } = call.args as any;
                
                // --- SIMULATE API CALL / EMAIL SENDING ---
                console.log("-----------------------------------------");
                console.log("🚀 AI LEAD CAPTURED:");
                console.log(`Name: ${name}`);
                console.log(`Contact: ${contact_info}`);
                console.log(`Type: ${inquiry_type}`);
                console.log("-----------------------------------------");
                // ------------------------------------------

                // Send the tool response back to the model
                result = await chat.sendMessage({
                  message: [{
                    functionResponse: {
                      name: 'submit_inquiry',
                      id: call.id,
                      response: { result: 'success', message: 'Inquiry sent to Raham successfully.' }
                    }
                  }]
                });
              }
            }
        }
    }

    // Safely extract text
    const responseText = result.text;
    if (responseText) {
        return responseText;
    }
    
    return "I've noted that down. Is there anything else I can help you with?";

  } catch (error) {
    // Log detailed error for debugging
    console.error("Gemini API Error Details:", error);
    
    // Check if error is related to API Key
    if (error instanceof Error && (error.message.includes("API key") || error.message.includes("403") || error.message.includes("400"))) {
       return "I'm having trouble connecting to my brain (API Key Issue). Please contact Raham directly at 248-238-1703.";
    }

    return "I am currently experiencing high traffic. Please try again later or contact Raham directly.";
  }
};