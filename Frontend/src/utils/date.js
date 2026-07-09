// WSB bot posts stock picks around noon ET, so before noon we show yesterday's data
export function getTradingDate() {
  const utc = new Date();
  const date = new Date(utc.getTime() - 4 * 60 * 60 * 1000);
  const hours = new Date().getHours();

  if (hours < 12) {
    date.setDate(date.getDate() - 1);
  }

  return date.toISOString().split("T")[0];
}
