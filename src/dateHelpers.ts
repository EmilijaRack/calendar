export function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
export function setDate(baseDate: Date, i: number) {
  const date = new Date(baseDate);
  date.setDate(i);
  return date;
}
