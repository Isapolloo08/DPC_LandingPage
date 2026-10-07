export function getVisitSundays(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Manila', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const value = (type: string) => parts.find(part => part.type === type)!.value;
  const today = new Date(`${value('year')}-${value('month')}-${value('day')}T00:00:00Z`);
  const offset = (7 - today.getUTCDay()) % 7;
  return [0, 7].map((extra, index) => {
    const date = new Date(today);
    date.setUTCDate(date.getUTCDate() + offset + extra);
    const formatted = new Intl.DateTimeFormat('en-PH', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' }).format(date);
    return { value: date.toISOString().slice(0, 10), label: `${index === 0 ? (offset === 0 ? 'This Sunday' : 'This coming Sunday') : 'Next Sunday'} · ${formatted}` };
  });
}
