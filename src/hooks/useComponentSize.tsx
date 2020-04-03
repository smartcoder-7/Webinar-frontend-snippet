import { useState, useCallback, useLayoutEffect } from "react"

type GetSize = (el: HTMLElement) => { width: number; height: number }
type UseComponentSize = (ref: any) => any

const getSize: GetSize = el => {
  if (!el) {
    return {
      width: 0,
      height: 0,
    }
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  }
}

const useComponentSize: UseComponentSize = ref => {
  const _useState = useState(getSize(ref ? ref.current : {}))
  const ComponentSize = _useState[0]
  const setComponentSize = _useState[1]

  const handleResize = useCallback(() => {
    if (ref.current) {
      setComponentSize(getSize(ref.current))
    }
  }, [ref])

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [ref.current])
  return ComponentSize
}

export default useComponentSize
