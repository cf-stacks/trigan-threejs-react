import { ReactNode } from 'react'

interface RoundProgressBarProps {
  children?: ReactNode
}

export const RoundProgressBar: React.FC<RoundProgressBarProps> = () => {
  const radius = 20
  const strokeWidth = 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - circumference
  return (
    <>
      <svg className="h-12 w-12">
        <circle
          className="stroke-current text-blue-500"
          stroke="#fff"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius - strokeWidth / 2}
          cx="50%"
          cy="50%"
        />
        <circle
          className="stroke-current"
          stroke="#fff"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius - strokeWidth / 2}
          cx="50%"
          cy="50%"
        />
        {/* <text
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-2xl font-semibold text-gray-700"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {}%
        </text> */}
      </svg>
    </>
  )
}
