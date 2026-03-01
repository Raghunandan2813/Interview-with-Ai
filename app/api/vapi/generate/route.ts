
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";
import { generateText } from "ai";
import { createGroq, groq } from "@ai-sdk/groq";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { getCurrentUser } from "@/lib/action/auth.action";




export async function POST(request: Request) {
  const body = await request.json();
  const { type, role, level, techstack, amount, userid } = body;

  const url = new URL(request.url);
  const useridFromQuery = url.searchParams.get("userid");

  try {
    const user = await getCurrentUser();
    const invalidUserIds = ["", "user", "{{userId}}", "{{vars.userId}}"];
    const bodyUseridValid = userid && typeof userid === "string" && !invalidUserIds.includes(userid);
    const resolvedUserId =
      user?.id ?? useridFromQuery ?? (bodyUseridValid ? userid : "");

    if (!role || !level || !amount) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
       
    const groqProvider = createGroq({
  apiKey: process.env.GROQ_API_KEY!,
});
  
    const { text } = await generateText({
      model: groqProvider("llama-3.3-70b-versatile"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    let parsedQuestions = [];

    try {
      parsedQuestions = JSON.parse(text);
    } catch {
      return Response.json(
        { success: false, error: "AI returned invalid JSON format" },
        { status: 500 }
      );
    }

    const interview = {
      role,
      type,
      level,
      techstack: techstack ? techstack.split(",") : [],
      questions: parsedQuestions,
      userId: resolvedUserId,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
