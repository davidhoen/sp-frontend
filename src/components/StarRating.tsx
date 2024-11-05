import React, { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslations } from "next-intl"

const adjustFillPercentage = (fill: number): number => {
  // round fill to the nearest quarter
  fill = Math.round(fill * 4) / 4

  // 1/4 star
  if (fill == 0.25) {
    return 0.35
  }
  // 2/4 star
  else if (fill == 0.5) {
    return 0.5
  }
  // 3/4 star
  else if (fill == 0.75) {
    return 0.62
  }
  return fill
}

const Star = ({ fill, onClick }: { fill: number, onClick?: () => void }) => {
  const adjustedFill = adjustFillPercentage(fill)
  const percentage = Math.round(adjustedFill * 100)

  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <defs>
        <clipPath id={`clip-${percentage}`}>
          <rect x="0" y="0" width={`${percentage}%`} height="100%" />
        </clipPath>
      </defs>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="none" stroke="#E5E5E5" strokeWidth="2" />
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="gold" clipPath={`url(#clip-${percentage})`} />
    </svg>
  )
}

export default function StarRating({ rating: initialRating, allowEdit, onRatingChange, maxStars = 4 }: { rating: number, allowEdit?: boolean, onRatingChange?: (newRating: number) => void, maxStars?: number }) {
  const t = useTranslations("ratings")
  const starTitles = [t("insufficient"), t("sufficient"), t("good"), t("excellent")]

  const [rating, setRating] = useState(initialRating)

  const handleRatingChange = (newRating: number) => {
    if (allowEdit) {
      setRating(newRating)
      if (onRatingChange) {
        onRatingChange(newRating)
      }
    }
  }

  const stars = []
  for (let i = 0; i < maxStars; i++) {
    const starRating = i + 1
    // Calculates the fill for each star based on the rating. Ensures the fill is between 0 and 1.
    const fill = Math.max(0, Math.min(1, rating - i))
    stars.push(
      // On edit mode, show a tooltip with the star title (e.g. "Good")
      allowEdit ?
        <Tooltip key={i}>
          <TooltipTrigger>
            <div className="flex">
              <Star key={i} fill={fill} onClick={() => handleRatingChange(starRating)} />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {starTitles[i]}
            </p>
          </TooltipContent>
        </Tooltip>
        :
        <Star key={i} fill={fill} />
    )
  }

  // Round down for the star title
  const roundedRating = Math.floor(rating) - 1
  // Round rating to the nearest quarter for the number of stars
  const quarterRating = Math.round(rating * 4) / 4

  return (
    <div aria-label={`Rating: ${rating} out of ${maxStars} stars`}>
      <TooltipProvider>
        {allowEdit ?
          stars
          :
          // When not editing, and just viewing, show a tooltip with the star title and the rating (e.g. "Good (3.5)")
          <Tooltip>
            <TooltipTrigger>
              <div className="flex">{stars}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {starTitles[roundedRating]} ({quarterRating})
              </p>
            </TooltipContent>
          </Tooltip>
        }
      </TooltipProvider>
    </div>
  )
}
