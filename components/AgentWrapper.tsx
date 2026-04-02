"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Use dynamic import with ssr disabled inside a client component
const Agent = dynamic(() => import('@/components/Agent'), { ssr: false });

export default function AgentWrapper(props: any) {
  return <Agent {...props} />;
}
