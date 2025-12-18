import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Define the tool for lead capture
const submitInquiryTool: FunctionDeclaration = {
  name: 'submit_inquiry',
  parameters: {
    type: Type.OBJECT,
    description: 'Submits the user\'s contact information and inquiry details to Raham Fayaz when they want to buy, sell, or get in touch.',
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
    // Initialize the AI client inside the function to ensure the API key is 
    // retrieved securely from the environment at the time of the call.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    if (!message || typeof message !== 'string') {
      return "I didn't catch that. Could you say it again?";
    }

    // Convert history to the format expected by the API
    const contents = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    // Add the current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ functionDeclarations: [submitInquiryTool] }],
      },
    });

    // Handle potential function calls from the model
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.functionCall && part.functionCall.name === 'submit_inquiry') {
          const { name, contact_info, inquiry_type } = part.functionCall.args as any;
          
          // Log the lead for the developer console
          console.log(`Lead Captured: ${name}, ${contact_info}, ${inquiry_type}`);

          // Send a tool response back to the model to acknowledge the action
          const toolResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [
              ...contents,
              response.candidates[0].content,
              {
                role: 'user',
                parts: [{
                  functionResponse: {
                    name: 'submit_inquiry',
                    response: { result: 'success', message: 'Inquiry sent successfully.' }
                  }
                }]
              }
            ],
            config: { systemInstruction: SYSTEM_INSTRUCTION }
          });

          return toolResponse.text || "Thank you. I've sent your information to Raham.";
        }
      }
    }

    return response.text || "I'm here to help with your real estate needs. What can I do for you?";

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    const errorMessage = error.message || error.toString();
    
    if (errorMessage.includes("403") || errorMessage.includes("API_KEY_INVALID") || errorMessage.includes("key not found")) {
      return "There is an issue with the API key configuration. Please ensure your Gemini API Key is correctly set in the platform settings. For security, do not paste your key into the chat.";
    }

    return "I'm having a little trouble connecting right now. Please try again in a moment or contact Raham directly at 248-238-1703.";
  }
};