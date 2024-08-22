import moment from "moment-timezone";

export function currentDayInEgypt(): string {
  const date = moment().tz("Africa/Cairo").format("DD-MM-YYYY");
  return date;
}

export function currentTimeInEgypt(): string {
  return moment().tz("Africa/Cairo").format("hh:mm:ss A");
}
export function getFormattedDateInEgypt(): string {
  return moment().tz("Africa/Cairo").format("dddd- D/MM/YYYY");
}

export function parseTime(time: string) {
  const parsedTime = moment.tz(time, "hh:mm:ss A", "Africa/Cairo");
  return parsedTime;
}
export function TimeNow() {
  return moment.tz("now", "UTC");
}
