"use client";

import React, { useEffect, useState } from "react";

interface LocalTimeProps {
  date: string;
  className?: string;
}

export default function LocalTime({ 
  date, 
  className 
}: LocalTimeProps) {
  const [formatted, setFormatted] = useState("...");

  useEffect(() => {
    if (date && date !== "N/A") {
      try {
        const d = new Date(date);
        setFormatted(d.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }));
      } catch {
        setFormatted(date);
      }
    } else {
      setFormatted("N/A");
    }
  }, [date]);

  return <span className={className}>{formatted}</span>;
}
