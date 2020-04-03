import React from "react"

interface RedCircularButtonProps {
  content?: any
  onClick?: (e?: any) => any
  className?: string
  as?: string
  type?: "button" | "submit" | "reset" | undefined
}

const RedCircularButton: React.FC<RedCircularButtonProps> = ({
  content = "x",
  onClick = () => {},
  className = "",
  ...props
}) => (
  <button
    onClick={(e: any) => {
      e.stopPropagation()
      e.preventDefault()
      onClick()
    }}
    className={`appearence-none focus:outline-none hover:shadow-lg shadow bg-coral-3 top-0 right-0 rounded-full w-5 h-5 items-center justify-center text-white z-10 ${className}`}
    {...props}
  >
    {content}
  </button>
)

export default RedCircularButton
