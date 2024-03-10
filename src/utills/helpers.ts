export function formatDate(date: Date) {
  const year = date.getFullYear();
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short" });
  const month = formatter.format(date);
  const dt = date.getDate();

  return month + " " + dt + ", " + year;
}
export function formatMonthYear(date: Date) {
  const year = date.getFullYear();
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short" });
  const month = formatter.format(date);

  return month + " " + year;
}
