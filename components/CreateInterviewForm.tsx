"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createInterview } from "@/lib/action/general.action";
import { toast } from "sonner";

const ROLES = ["Frontend Developer", "Backend Developer", "Full Stack", "DevOps", "Data Engineer", "Product Manager"];
const LEVELS = ["Junior", "Mid", "Senior", "Lead"];
const TYPES = ["Behavioural", "Technical", "Mix"];

export default function CreateInterviewForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("Mix");
  const [techstack, setTechstack] = useState("");
  const [amount, setAmount] = useState(5);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createInterview({
        role: role || "Software Engineer",
        type,
        level: level || "Mid",
        techstack,
        amount,
      });
      if (result.success) {
        toast.success("Interview created. Redirecting…");
        router.push(`/interview/${result.interviewId}`);
        return;
      }
      toast.error(result.error || "Something went wrong");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-dark-200/80 p-6 space-y-4 max-w-md"
    >
      <h3 className="text-lg font-semibold text-light-100">Create a new interview</h3>
      <p className="text-sm text-light-400">
        This will be saved to your account and appear under &quot;Your Interviews&quot;.
      </p>

      <div>
        <label className="block text-sm font-medium text-light-100 mb-1">Role</label>
        <Input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g. Frontend Developer"
          list="roles-list"
        />
        <datalist id="roles-list">
          {ROLES.map((r) => (
            <option key={r} value={r} />
          ))}
        </datalist>
      </div>

      <div>
        <label className="block text-sm font-medium text-light-100 mb-1">Level</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full h-10 rounded-xl border border-white/10 bg-dark-300 px-4 text-light-100 focus:ring-2 focus:ring-primary-200/50 outline-none"
        >
          <option value="">Select level</option>
          {LEVELS.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-light-100 mb-1">Focus</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full h-10 rounded-xl border border-white/10 bg-dark-300 px-4 text-light-100 focus:ring-2 focus:ring-primary-200/50 outline-none"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-light-100 mb-1">Tech stack (comma-separated)</label>
        <Input
          value={techstack}
          onChange={(e) => setTechstack(e.target.value)}
          placeholder="e.g. React, Node, TypeScript"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-light-100 mb-1">Number of questions</label>
        <Input
          type="number"
          min={3}
          max={15}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value) || 5)}
        />
      </div>

      <Button type="submit" className="w-full btn-primary" disabled={loading}>
        {loading ? "Creating…" : "Create interview"}
      </Button>
    </form>
  );
}
