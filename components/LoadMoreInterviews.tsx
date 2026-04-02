"use client"

import React, { useState } from 'react'
import InterviewCard from './InterviewCard'
import { Button } from './ui/button'

interface Props {
  interviews: any[];
}

const LoadMoreInterviews = ({ interviews }: Props) => {
  const [visibleCount, setVisibleCount] = useState(5)

  if (!interviews || interviews.length === 0) {
    return (
      <p className="text-light-600 rounded-xl border border-white/10 bg-dark-200/50 px-6 py-8 text-center">
        There are no new interviews available.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="interviews-section">
        {interviews.slice(0, visibleCount).map((interview) => (
          <InterviewCard {...interview} key={interview.id} />
        ))}
      </div>
      
      {visibleCount < interviews.length && (
        <div className="flex justify-center mt-2 w-full">
          <Button 
            variant="outline"
            className="bg-dark-200 text-light-100 hover:bg-dark-300 border-white/10 px-8 rounded-xl font-semibold min-h-11 cursor-pointer transition-all duration-200" 
            onClick={() => setVisibleCount((prev) => prev + 5)}
          >
            Load More Interviews
          </Button>
        </div>
      )}
    </div>
  )
}

export default LoadMoreInterviews
