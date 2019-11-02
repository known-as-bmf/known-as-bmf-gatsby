import { DateTime, Zone } from 'luxon';
import { isNil } from 'ramda';
import React, { FunctionComponent, TimeHTMLAttributes, useMemo } from 'react';

import { parseDate } from '../utils/date';

interface Props extends TimeHTMLAttributes<HTMLElement> {
  /**
   * The date to display.
   */
  date: string | Date | DateTime;
  /**
   * The format to use.
   */
  format?: Intl.DateTimeFormatOptions;
  /**
   * The timezone to use for output.
   */
  outputZone?: Zone | 'local' | 'original';
  /**
   * If date is a string, format to use to parse the date. If not specified, assume ISO format.
   */
  parseFormat?: string;
}
export const FormattedDate: FunctionComponent<Props> = ({
  date,
  format = DateTime.DATETIME_SHORT,
  outputZone = 'local',
  parseFormat,
  ...props
}) => {
  const luxonDate = useMemo(() => {
    const parsedDate = parseDate(date, parseFormat);

    // special value for outputZone: 'original'
    if (isNil(outputZone) || outputZone === 'original') {
      return parsedDate;
    }
    return parsedDate.setZone(outputZone);
  }, [date, parseFormat, outputZone]);

  return (
    <time dateTime={luxonDate && luxonDate.toISO()} {...props}>
      {luxonDate && luxonDate.toLocaleString({ ...format })}
    </time>
  );
};

type FixedZoneProps = Omit<Props, 'outputZone'>;
export const OriginalDate: FunctionComponent<FixedZoneProps> = props => (
  <FormattedDate {...props} outputZone="original" />
);

export const LocalDate: FunctionComponent<FixedZoneProps> = props => (
  <FormattedDate {...props} outputZone="local" />
);
