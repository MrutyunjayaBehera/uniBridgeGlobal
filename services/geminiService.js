import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
const systemInstruction =
  "You are UniBot, a helpful and encouraging academic counselor for 'UniBridge Global'. Your goal is to help students find foreign universities, explain application processes, draft emails to professors, and compare academic programs. Be concise, friendly, and use formatting like bullet points for readability. If asked about specific university data not in your training set, provide general advice or suggest checking the official website.";

export const generateAIResponse = async (prompt) => {
  if (!apiKey || !ai) {
    return "Error: API Key is missing. Please check your configuration.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      config: {
        systemInstruction: {
          role: 'system',
          parts: [{ text: systemInstruction }],
        },
      },
    });

    return response.text?.trim() || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
};
