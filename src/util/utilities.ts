import moment from 'moment';

export const convertTimeStampToIso = (timeStamp: number) =>
  moment(timeStamp * 1000).toISOString();

export const kelvinToCelcius = (tempInKelvin: number) =>
  parseFloat((tempInKelvin - 273.15).toFixed(2));

export const convertTimeToFormat = (time: string, format: string = '') =>
  moment(time).format(format);
