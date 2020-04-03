import React from "react"

interface RedCircleProps {
  content?: any
  className?: string
}

const RedCircle: React.FC<RedCircleProps> = ({ className = "", ...props }) => (
  <div
    className={`appearence-none focus:outline-none hover:shadow-lg shadow bg-coral-3 top-0 right-0 rounded-full w-5 h-5 items-center justify-center text-white z-10 ${className}`}
    {...props}
  />
)

export default RedCircle
