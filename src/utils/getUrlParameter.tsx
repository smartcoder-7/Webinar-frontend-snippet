export const getUrlParameter = (
  name: string,
  location = typeof window !== "undefined" && window.location
) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
  let results = null
  if (location) {
    results = regex.exec(location.search)
  }
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "))
}
