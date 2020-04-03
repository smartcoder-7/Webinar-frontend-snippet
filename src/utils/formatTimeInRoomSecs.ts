export default function formatTimeInRoomSec(n: number) {
  if (typeof n === 'string') {
    n = parseInt(n, 10);
  }
  const isNegative = n < 0;
  n = isNegative ? n * -1 : n;
  n = Math.floor(n);

  var hours = Math.floor(n / 3600);
  var minutes = Math.floor((n - hours * 3600) / 60);
  var seconds = n - hours * 3600 - minutes * 60;
  return (
    (isNegative ? '-' : '') +
    (hours > 0 ? hours.toString().padStart(2, '0') + ':' : '') +
    minutes.toString().padStart(2, '0') +
    ':' +
    seconds.toString().padStart(2, '0')
  );
}
