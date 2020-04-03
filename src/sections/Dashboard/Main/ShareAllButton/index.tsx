import React from "react"

const ShareAllButton: React.FunctionComponent<any> = ({ onClick }) => {
  return (
    <a 
      type="button" 
      className="flex items-center cursor-pointer"
      onClick={onClick}
    >
      <img
        className="w-5 mr-3"
        src={require("@src/images/share.svg").default}
        alt="share all button"
      />
      <span className="text-blue-3">Share all webinars</span>
    </a>
  )
}

export default ShareAllButton