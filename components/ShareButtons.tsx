"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

interface ShareButtonsProps {
  score?: number;
  role: string;
  appName?: string;
}

const ShareButtons = ({ score, role, appName = "PrepAI" }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const getShareText = () => {
    if (score) {
      return `I just scored ${score}/100 on my ${role.toUpperCase()} mock interview using ${appName}! Check it out and prepare for your next big role.`;
    }
    return `I just completed a ${role.toUpperCase()} mock interview using ${appName}! Check it out and prepare for your next big role.`;
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(currentUrl);
    // LinkedIn share intent is mostly URL-based nowadays, but text works as summary in some forms
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="flex flex-row items-center gap-3 mt-4">
      <Button
        variant="outline"
        className="flex gap-2 items-center bg-white/5 border-white/20 text-white hover:bg-white/10"
        onClick={handleTwitterShare}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
        </svg>
        Post
      </Button>
      <Button
        variant="outline"
        className="flex gap-2 items-center bg-[#0A66C2]/10 border-[#0A66C2]/20 text-[#0A66C2] hover:bg-[#0A66C2]/20"
        onClick={handleLinkedInShare}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
        </svg>
        Share
      </Button>
      <Button variant="ghost" onClick={handleCopyLink} className="text-light-400 hover:text-white">
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  );
};

export default ShareButtons;
