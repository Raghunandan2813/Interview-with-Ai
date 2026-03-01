
import Agent from "@/components/Agent";
import CreateInterviewForm from "@/components/CreateInterviewForm";
import { getCurrentUser } from "@/lib/action/auth.action";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-xl font-semibold text-light-100 mb-2">
          Create an interview
        </h2>
        <p className="text-light-400 text-sm mb-4">
          Create a new interview and it will be saved to your account and show under &quot;Your Interviews&quot; on the dashboard.
        </p>
        <CreateInterviewForm />
      </div>

      <div className="pt-4 border-t border-white/10">
        <h2 className="text-lg font-semibold text-light-100 mb-2">
          Or use voice to generate (AI assistant)
        </h2>
        <p className="text-light-400 text-sm mb-4">
          Start a call and describe the role and level; the assistant may create an interview (ensure it is linked to your account in the assistant settings).
        </p>
        <Agent userName={user?.name!} userId={user?.id} type="generate" />
      </div>
    </div>
  );
};

export default page;