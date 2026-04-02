"use server";

import { groq, createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

export async function generateQuizQuestions(
  topic?: string
): Promise<{ success: true; questions: QuizQuestion[] } | { success: false; error: string }> {
  try {
    const defaultTopics = [
      "JavaScript Event Loop", "React Hooks", "System Design patterns", "Object Oriented Programming", 
      "Database High Availability", "REST API architecture", "TCP/IP vs UDP", "Git workflows"
    ];
    const finalTopic = topic && topic.trim() !== "" ? topic : defaultTopics[Math.floor(Math.random() * defaultTopics.length)];

    const groqProvider = createGroq({ apiKey: process.env.GROQ_API_KEY! });
    
    // Using llama-3.3-70b-versatile for fast reasoning
    const { text } = await generateText({
      model: groqProvider("llama-3.3-70b-versatile"),
      system: `You are an expert technical interviewer designing a fun multiple-choice quiz. Return ONLY valid JSON, adhering exactly to the structure requested, with absolutely no markdown wrapping, no markdown \`\`\`json\`\`\` fences, and no conversational text.`,
      prompt: `Generate 5 multiple-choice questions on the topic: "${finalTopic}".
      
      ESCALATING DIFFICULTY REQUIREMENT:
      Question 1: Very Easy
      Question 2: Easy
      Question 3: Medium
      Question 4: Hard
      Question 5: Extremely Difficult/Niche
      
      Return a JSON array of precisely this structure:
      [
        {
          "question": "<string>",
          "options": ["<string>", "<string>", "<string>", "<string>"],
          "correctAnswerIndex": <index from 0 to 3>,
          "explanation": "<short string explaining why>"
        }
      ]`,
    });

    // Clean any accidental markdown blocks returned by the model
    const rawJson = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    
    const parsedQuestions = JSON.parse(rawJson);
    
    if (!Array.isArray(parsedQuestions) || parsedQuestions.length !== 5) {
      throw new Error("Invalid output structure");
    }

    return { success: true, questions: parsedQuestions };
  } catch (error) {
    console.error("Error generating quiz", error);
    return { success: false, error: "Failed to generate questions. Please try again." };
  }
}
