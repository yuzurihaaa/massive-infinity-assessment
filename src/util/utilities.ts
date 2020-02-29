import moment from 'moment';

export const convertTimeStampToIso = (timeStampt: number) =>
  moment(timeStampt * 1000).toISOString();

export const kelvinToCelcius = (tempInKelvin: number) =>
  parseFloat((tempInKelvin - 271.15).toFixed(2));

export const convertTimeToFormat = (time: string, format: string = '') =>
  moment(time).format(format)
