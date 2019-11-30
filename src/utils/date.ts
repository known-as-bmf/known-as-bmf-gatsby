import { DateTime } from 'luxon';
import { is as ris, isNil } from 'ramda';

export const parseDate = (
  date: Date | DateTime | string,
  parseFormat: string | null = null
): DateTime => {
  if (!isNil(date)) {
    if (is(DateTime, date)) {
      return date;
    } else if (is(Date, date)) {
      return DateTime.fromJSDate(date);
    } else if (is(String, date)) {
      if (isNil(parseFormat)) {
        return DateTime.fromISO(date, { setZone: true });
      } else {
        return DateTime.fromFormat(date, parseFormat, { setZone: true });
      }
    }
  }

  throw new Error('Could not parse date');
};

const is = <T extends object>(ctor: new (...args: any[]) => T, val: any): val is T =>
  ris(ctor, val);
