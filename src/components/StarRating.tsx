import React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslations } from "next-intl"

interface StarRatingProps {
  rating: number
  maxStars?: number
}

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

const Star: React.FC<{ fill: number }> = ({ fill }) => {
  const adjustedFill = adjustFillPercentage(fill)
  const percentage = Math.round(adjustedFill * 100)

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id={`clip-${percentage}`}>
          <rect x="0" y="0" width={`${percentage}%`} height="100%" />
        </clipPath>
      </defs>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="none" stroke="gold" strokeWidth="2" />
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="gold" clipPath={`url(#clip-${percentage})`} />
    </svg>
  )
}

export default function StarRating({ rating, maxStars = 4 }: StarRatingProps) {
  const t = useTranslations("ratings")
  const starTitles = [t("insufficient"), t("sufficient"), t("good"), t("excellent")]

  const stars = []
  for (let i = 0; i < maxStars; i++) {
    // Calculates the fill for each star based on the rating. Ensures the fill is between 0 and 1.
    const fill = Math.max(0, Math.min(1, rating - i))
    stars.push(<Star key={i} fill={fill} />)
  }

  // Round down for the star title
  const roundedRating = Math.floor(rating) - 1
  // Round rating to the nearest quarter for the number of stars
  const quarterRating = Math.round(rating * 4) / 4

  return (
    <div>
      <TooltipProvider>
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
      </TooltipProvider>
    </div>
  )
}
