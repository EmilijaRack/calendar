export function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
export function setDate(baseDate, i) {
  const date = new Date(baseDate);
  date.setDate(i);
  return date;
}
