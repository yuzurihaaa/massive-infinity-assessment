import {List, WeatherResponse} from '../model';
import {IWeatherObject} from '../redux';
import {convertTimeStampToIso, kelvinToCelcius} from './utilities';

export const mapWeatherResponseToWeatherObject = (
  response: List,
): IWeatherObject => ({
  date: convertTimeStampToIso(response.dt),
  maxTemperature: kelvinToCelcius(response.temp.max),
  minTemperature: kelvinToCelcius(response.temp.min),
  weather: response.weather[0].main,
});

export const weatherMemo = (data: WeatherResponse) => {
  const weathers = {} as {[key: string]: IWeatherObject};
  data.list.map(listItem => {
    const currentKey = convertTimeStampToIso(listItem.dt);
    weathers[currentKey] = mapWeatherResponseToWeatherObject(listItem);
  });

  const dates = data.list.map(item => convertTimeStampToIso(item.dt));

  return {
    weathers,
    dates,
  };
};
