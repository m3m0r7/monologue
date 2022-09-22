import dayjs, { Dayjs } from "dayjs";

export const calculateBehindDays = (date1: Dayjs, date2: Dayjs) => {
  const diff = parseInt(date1.format('D')) - parseInt(date2.format('D'))
  return diff >= 0
    ? `${diff} day${diff > 1 ? 's' : ''} ago`
    : `${Math.abs(diff)} day${Math.abs(diff) > 1 ? 's' : ''} after`
}
