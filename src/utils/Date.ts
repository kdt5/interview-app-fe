export function formatToWeeklyLabel(dateStr: string): string {
  const date = new Date(dateStr);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  const weekOfMonth = Math.ceil(day / 7);

  return `${month}월 ${weekOfMonth}주차`;
}
