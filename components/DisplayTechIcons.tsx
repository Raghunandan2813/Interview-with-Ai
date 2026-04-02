"use client"
import { getTechLogos } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { cn } from '@/lib/utils';

const DisplayTechIcons = ({ techStack }: TechIconProps) => {
  const [techIcons, setTechIcons] = useState<{tech: string, url: string}[] | null>(null);

  useEffect(() => {
    let mounted = true;
    getTechLogos(techStack).then((res) => {
      if (mounted) {
        setTechIcons(res);
      }
    });

    return () => {
      mounted = false;
    };
  }, [techStack]);

  if (!techIcons) {
    return (
      <div className="flex flex-row gap-0 w-16 h-10 animate-pulse bg-white/5 rounded-lg" />
    );
  }

  return (
    <div className="flex flex-row gap-0">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-dark-300 rounded-lg p-2 flex-center border border-white/5",
            index >= 1 && "-ml-2"
          )}
        >
          <span className="tech-tooltip">{tech}</span>
          <Image src={url} alt={tech} width={24} height={24} className="size-6" />
        </div>
      ))}
    </div>
  )
}

export default DisplayTechIcons;