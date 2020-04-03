/** @jsx jsx */
import { jsx, } from "@emotion/core"
import cn from "classnames"
import React from "react"

const SearchForm: React.FunctionComponent<any> = ({ searchTerm, onHandleSearchTerm, onClose }: any) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [focused, setFocused] = React.useState(false)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onHandleSearchTerm(e.target.value)
  }

  const onSearchClick = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.classList.remove("opacity-0")
      inputRef.current.classList.add("opacity-100")
      inputRef.current.focus()
    }
  }

  const onCloseClick = () => {
    onClose()
  }

  const onBlur = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.classList.remove("opacity-100")
      inputRef.current.classList.add("opacity-0")
    }
    if (wrapperRef && wrapperRef.current) {
      wrapperRef.current.style.borderBottom = "none"
    }
    setFocused(false)
    onClose()
  }

  const onFocus = () => {
    if (wrapperRef && wrapperRef.current) {
      wrapperRef.current.style.borderBottom = "2px solid #99ACAE"
    }
    if (inputRef && inputRef.current) {
      inputRef.current.classList.remove("opacity-0")
      inputRef.current.classList.add("opacity-100")
    }
    setFocused(true)
  }

  const onMouseEnter = () => {
    if (wrapperRef && wrapperRef.current && !focused) {
      wrapperRef.current.style.borderBottom = "2px dashed #99ACAE"
    }
    if (inputRef && inputRef.current) {
      inputRef.current.classList.remove("opacity-0")
      inputRef.current.classList.add("opacity-100")
    }
  }

  const onMouseLeave = () => {
    if (!focused && wrapperRef && wrapperRef.current) {
      wrapperRef.current.style.borderBottom = "2px dashed transparent"
    }
    if (!focused && inputRef && inputRef.current) {
      inputRef.current.classList.remove("opacity-100")
      inputRef.current.classList.add("opacity-0")
    }
  }

  return (
    <div className="search-form flex">
      <div
        ref={wrapperRef}
        className="flex bg-transparent leading-loose"
        style={{transitionProperty: 'border-color', borderBottom:'2px solid transaprent'}}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <input
          ref={inputRef}
          className="search-form__input w-1 text-light border-none outline-none w-full bg-blue-1 opacity-0 transition-300"
          style={{transitionProperty: 'width, opacity'}}
          placeholder="Search eWebinars"
          value={searchTerm || ""}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <img
          className={cn("w-2 ml-2 text-gray-1 mr-4", {"invisible": searchTerm === ""})}
          src={require("@src/images/close.svg").default}
          onClick={onCloseClick}
          alt="close icon"
        />
        <img
          className="w-5"
          src={require("@src/images/search.svg").default}
          onClick={onSearchClick}
          alt="search icon"
        />
      </div>
    </div>
  )
}

export default SearchForm