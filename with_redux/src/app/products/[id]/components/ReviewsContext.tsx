'use client'

import React, { useState, createContext } from 'react'
import { type Review } from '../../../../api/types'

export const useReviewsState = (initialReviews: Review[]) =>
  useState<Review[]>(initialReviews)

export const ReviewsContext = createContext<ReturnType<
  typeof useReviewsState
> | null>(null)

export const useReviews = () => {
  const reviewsState = React.useContext(ReviewsContext)
  if (!reviewsState) {
    throw new Error('useReviews must be used within a ReviewsProvider')
  }
  return reviewsState
}

const ReviewsProvider = ({
  initialReviews,
  children,
}: {
  initialReviews: Review[]
  children: React.ReactNode
}) => {
  const reviewsState = useReviewsState(initialReviews)
  return (
    <ReviewsContext.Provider value={reviewsState}>
      {children}
    </ReviewsContext.Provider>
  )
}

export default ReviewsProvider
