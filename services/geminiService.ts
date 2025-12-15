import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData, AiFeedbackResponse } from "../types";

const getGeminiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found via process.env.API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeResume = async (resume: ResumeData): Promise<AiFeedbackResponse> => {
  const ai = getGeminiClient();
  
  const promptText = `
    Act as a highly enthusiastic Senior Talent Acquisition Leader and Cricket Commentator.
    Review the resume data for 'Raj Vimal'.
    
    AUDIENCE: Recruiters, Hiring Managers, and Team Leads viewing this profile.
    GOAL: Pitch Raj Vimal as a "Match Winner" and a "Top Draft Pick" to the employer.
    
    CRITICAL RULES:
    1. STRICTLY write in the THIRD PERSON (Use "Raj", "He", "The candidate"). NEVER use "You" or address Raj directly.
    2. Focus purely on strengths, ROI, and commercial impact.
    3. Do not give advice. Give endorsements.
    
    Resume Data:
    ${JSON.stringify(resume)}

    Return valid JSON with the following structure:
    - score: A high score (between 90 and 99) reflecting his strong market value.
    - strengths: 3 punchy bullet points on why he is an asset (e.g., "Raj drives 50% organic growth...").
    - growthPlan: 3 areas where he is poised to deliver immediate impact (e.g., "Ready to lead larger teams", "Scalable content ops").
    - suggestions: 3 "Hiring Signals" or "Why Hire Now" points (e.g., "Rare blend of SEO and Editorial", "Proven revenue driver").
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          parts: [
            { text: promptText }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "A high score out of 100 based on impact." },
            strengths: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 3 key strengths."
            },
            growthPlan: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of 3 positive future growth areas."
            },
            suggestions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3 actionable tips for success."
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AiFeedbackResponse;
    }
    
    throw new Error("No content generated");
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate analysis. Check console for details.");
  }
};