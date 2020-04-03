function format(n: string): string
function format(n: number): string
function format(n: number | string): string {
  if (typeof n === "string") {
    n = parseInt(n, 10)
  }
  n = Math.floor(n)
  var hours = Math.floor(n / 3600)
  var minutes = Math.floor((n - hours * 3600) / 60)
  var seconds = n - hours * 3600 - minutes * 60
  return (
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  )
}
export default format
