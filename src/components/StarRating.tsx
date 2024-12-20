"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getStarTitles, roundToQuarter } from "@/lib"
import { useTranslations } from "next-intl"
import { useState } from "react"

const adjustFillPercentage = (fill: number): number => {
  fill = roundToQuarter(fill)
  if (fill == 0.25) return 0.35
  else if (fill == 0.5) return 0.5
  else if (fill == 0.75) return 0.62
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

const StarButton = ({ index, fill, onClick, title }: {
  index: number,
  fill: number,
  onClick: (rating: number) => void,
  title: string
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex">
          <Star fill={fill} onClick={() => onClick(index + 1)} />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default function StarRating({ rating: initialRating, allowEdit, onRatingChange, maxStars = 4, showRatingTitle }: { rating: number, allowEdit?: boolean, onRatingChange?: (newRating: number) => void, maxStars?: number, showRatingTitle?: boolean }) {
  // Move hooks to the top level
  const t = useTranslations("ratings")
  const [rating, setRating] = useState(initialRating)
  const starTitles = getStarTitles(t)

  const handleRatingChange = (newRating: number) => {
    if (allowEdit) {
      setRating(newRating)
      onRatingChange?.(newRating)
    }
  }

  // Round down for the star title
  const roundedRating = Math.floor(rating) - 1
  // Round rating to the nearest quarter for the number of stars
  const quarterRating = Math.round(rating * 4) / 4

  const renderStars = () => {
    return Array.from({ length: maxStars }, (_, i) => {
      const fill = Math.max(0, Math.min(1, rating - i))

      if (allowEdit) {
        return (
          <StarButton
            key={i}
            index={i}
            fill={fill}
            onClick={handleRatingChange}
            title={starTitles[i]}
          />
        )
      }

      return <Star key={i} fill={fill} />
    })
  }

  return (
    <div aria-label={`Rating: ${rating} out of ${maxStars} stars`}>
      <TooltipProvider>
        <div className="flex items-center gap-2">
          {allowEdit ? (
            <div className="flex">{renderStars()}</div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex w-fit">{renderStars()}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{starTitles[roundedRating]} ({quarterRating})</p>
              </TooltipContent>
            </Tooltip>
          )}
          {showRatingTitle && <p className="text-sm">{starTitles[roundedRating]}</p>}
        </div>
      </TooltipProvider>
    </div>
  )
}