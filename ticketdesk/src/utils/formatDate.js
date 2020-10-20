export function formatDate(date) {
  let d = new Date(date).getTime();
  let today = Date.now();
  let diff = (today - d) / 1000;
  diff = diff / (60 * 60) / 24;
  return Math.floor(diff);
}
