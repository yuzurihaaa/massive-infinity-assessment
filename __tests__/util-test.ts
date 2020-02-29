import {
  convertTimeStampToIso,
  convertTimeToFormat,
  kelvinToCelcius,
  mapWeatherResponseToWeatherObject,
  weatherMemo,
} from '../src/util';
import data from './response.json';
import moment from 'moment';

test('test mapper map data accordingly', () => {
  const converted = mapWeatherResponseToWeatherObject(data.list[0]);

  // first temperature is 285.51 in Kelvin
  // timestamp is 1485741600 it is 2017-01-30T02:00:00.000Z
  //
  // Source: https://www.vercalendario.info/en/how/convert-timestamp-date.html
  expect(converted).toStrictEqual({
    date: '2017-01-30T02:00:00.000Z',
    maxTemperature: 12.36,
    minTemperature: 12.36,
    weather: 'Clear',
  });
});

test('test weather memo', () => {
  const memoObject = weatherMemo(data);

  // first temperature is 285.51 in Kelvin
  // timestamp is 1485741600 it is 2017-01-30T02:00:00.000Z
  //
  // Source: https://www.vercalendario.info/en/how/convert-timestamp-date.html
  expect(memoObject).toStrictEqual({
    dates: [
      '2017-01-30T02:00:00.000Z',
      '2017-01-31T02:00:00.000Z',
      '2017-02-01T02:00:00.000Z',
      '2017-02-02T02:00:00.000Z',
      '2017-02-03T02:00:00.000Z',
      '2017-02-04T02:00:00.000Z',
      '2017-02-05T02:00:00.000Z',
      '2017-02-06T02:00:00.000Z',
      '2017-02-07T02:00:00.000Z',
      '2017-02-08T02:00:00.000Z',
    ],
    weathers: {
      '2017-01-30T02:00:00.000Z': {
        date: '2017-01-30T02:00:00.000Z',
        maxTemperature: 12.36,
        minTemperature: 12.36,
        weather: 'Clear',
      },
      '2017-01-31T02:00:00.000Z': {
        date: '2017-01-31T02:00:00.000Z',
        maxTemperature: 11.51,
        minTemperature: 9.12,
        weather: 'Clear',
      },
      '2017-02-01T02:00:00.000Z': {
        date: '2017-02-01T02:00:00.000Z',
        maxTemperature: 12.55,
        minTemperature: 10.06,
        weather: 'Clear',
      },
      '2017-02-02T02:00:00.000Z': {
        date: '2017-02-02T02:00:00.000Z',
        maxTemperature: 11.98,
        minTemperature: 8.71,
        weather: 'Clear',
      },
      '2017-02-03T02:00:00.000Z': {
        date: '2017-02-03T02:00:00.000Z',
        maxTemperature: 10.6,
        minTemperature: 2.53,
        weather: 'Rain',
      },
      '2017-02-04T02:00:00.000Z': {
        date: '2017-02-04T02:00:00.000Z',
        maxTemperature: 10.07,
        minTemperature: 3.54,
        weather: 'Clear',
      },
      '2017-02-05T02:00:00.000Z': {
        date: '2017-02-05T02:00:00.000Z',
        maxTemperature: 11.51,
        minTemperature: 3.13,
        weather: 'Rain',
      },
      '2017-02-06T02:00:00.000Z': {
        date: '2017-02-06T02:00:00.000Z',
        maxTemperature: 10.61,
        minTemperature: 5.59,
        weather: 'Rain',
      },
      '2017-02-07T02:00:00.000Z': {
        date: '2017-02-07T02:00:00.000Z',
        maxTemperature: 7.99,
        minTemperature: 2.71,
        weather: 'Clear',
      },
      '2017-02-08T02:00:00.000Z': {
        date: '2017-02-08T02:00:00.000Z',
        maxTemperature: 8.46,
        minTemperature: 2.36,
        weather: 'Rain',
      },
    },
  });
});

test('convert timestamp to iso', () => {
  const currentTime = 1485741600;

  const convertedTime = '2017-01-30T02:00:00.000Z';

  expect(convertTimeStampToIso(currentTime)).toBe(convertedTime);
});

test('convert kelvin to celcius', () => {
  const kelvinTemperature = 123456;

  const celciusTemperature = 123182.85;

  expect(kelvinToCelcius(kelvinTemperature)).toBe(celciusTemperature);
});

test('kelvin to celcius is 271.15 degree difference', () => {
  const kelvinTemperature = 0;

  const celciusTemperature = -273.15;

  expect(kelvinToCelcius(kelvinTemperature)).toBe(celciusTemperature);
});

test('convert time format should able to take input format', () => {
  const inputTime = '2017-01-30T02:00:00.000Z';

  const formattedTime = '30/01/2017';

  expect(convertTimeToFormat(inputTime, 'DD/MM/YYYY')).toBe(formattedTime);
});

test('If no format it should return iso format', () => {
  const inputTime = '2017-01-30T02:00:00.000Z';

  expect(convertTimeToFormat(inputTime)).toBe(moment(inputTime).format());
});
