import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';


const interviewCard = ({id, userId, role , type, techstack, createdAt}: InterviewCardProps) => {

  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY')


  return (
    <div className="card-border w-[340px] max-sm:w-full min-h-[320px]">
      <div className="card-interview">
        <div className="flex flex-col">
          <div className="absolute top-0 right-0 w-fit px-3 py-1.5 rounded-bl-xl rounded-tr-2xl bg-primary-300/90 text-dark-100">
            <p className="badge-text text-xs">{normalizedType}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover"
            width={72}
            height={72}
            className="rounded-xl object-cover size-[72px] ring-2 ring-white/10"
          />
          <h3 className="mt-4 capitalize text-lg font-semibold text-light-100">
            {role} Interview
          </h3>
          <div className="flex flex-row gap-4 mt-2 text-sm text-light-400">
            <div className="flex flex-row gap-1.5 items-center">
              <Image src="/calendar.svg" alt="calendar" width={18} height={18} />
              <span>{formattedDate}</span>
            </div>
            <div className="flex flex-row gap-1.5 items-center">
              <Image src="/star.svg" alt="score" width={18} height={18} />
              <span>{feedback?.totalScore ?? "---"}/100</span>
            </div>
          </div>
          <p className="line-clamp-2 mt-4 text-sm text-light-400 leading-relaxed">
            {feedback?.finalAssessment ||
              "You haven't taken the interview yet. Take it now to improve your skills."}
          </p>
        </div>
        <div className="flex flex-row justify-between items-end gap-3">
          <DisplayTechIcons techStack={techstack} />
          <Button className="btn-primary shrink-0" asChild>
            <Link href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}>
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
 
export default interviewCard;
