import moment, { Moment } from 'moment';

export const getDateStringForDashboardFilter = (date: Date | undefined): string => {
  if (!date) return '';
  return moment(date).format('YYYY-MM-DD');
};

export const minutesToMoment = (minutes?: number): Moment | null => {
  if (!minutes) {
    return null;
  }
  const h = Math.floor(minutes / 60);
  const m = Math.round((minutes / 60 - h) * 60);
  return moment()
    .hour(h)
    .minutes(m)
    .seconds(0);
};

export const momentToMinutes = (dt: Moment): number => {
  return dt.hour() * 60 + dt.minutes();
};
