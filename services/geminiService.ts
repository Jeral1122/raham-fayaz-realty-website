import { GoogleGenAI, GenerateContentResponse, FunctionDeclaration, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY || '';
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
    
    // Create chat with tool configuration
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ functionDeclarations: [submitInquiryTool] }],
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    // Send initial message
    let result = await chat.sendMessage({
      message: message
    });

    // Handle Function Calls (if the model decides to capture a lead)
    const functionCalls = result.candidates?.[0]?.content?.parts?.filter(part => part.functionCall);
    
    if (functionCalls && functionCalls.length > 0) {
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

        // Send the tool response back to the model so it can confirm to the user
        // FIX: Wrapped the part in the 'message' property
        result = await chat.sendMessage({
          message: [{
            functionResponse: {
              name: 'submit_inquiry',
              response: { result: 'success', message: 'Inquiry sent to Raham successfully.' }
            }
          }]
        });
      }
    }

    return result.text || "I'm having trouble connecting right now. Please call Raham at 248-238-1703.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently experiencing high traffic. Please try again later or contact Raham directly.";
  }
};