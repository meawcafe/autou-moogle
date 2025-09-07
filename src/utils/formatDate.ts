export function formatDate(date: string | number | Date) {
  const now = new Date();
  // ensure date is a Date object
  const then = date instanceof Date ? date : new Date(date);
  const diff = now.getTime() - then.getTime();

  // units in milliseconds
  const units = {
    year: 1000 * 60 * 60 * 24 * 365,
    month: 1000 * 60 * 60 * 24 * 30,
    week: 1000 * 60 * 60 * 24 * 7,
    day: 1000 * 60 * 60 * 24,
    hour: 1000 * 60 * 60,
    minute: 1000 * 60,
    second: 1000,
  };

  // determine the largest fitting unit
  for (const [unit, ms] of Object.entries(units)) {
    const qty = Math.floor(diff / ms);
    // if qty is 1 or more, return the formatted string
    if (qty >= 1) {
      return qty === 1
        ? `1 ${unit} ago`
        : `${qty} ${unit}s ago`;
    }
  }
  return 'just now';
}