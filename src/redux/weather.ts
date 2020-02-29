import {Dispatch} from 'redux';

import {Actions} from './main';
import {WeatherResponse} from '../model';
import {weatherMemo} from '../util';
import {Alert} from 'react-native';

// Action Names
const GET_WEATHER = 'GET_WEATHER';

// Actions
const getWeather = () => (dispatch: Dispatch) => {
  // I am using sample api, I can't use custom latitude / longitude else this will throw error.
  // Apparently I need to pay for the daily forecast which I don't think I need to
  fetch(
    'https://samples.openweathermap.org/data/2.5/forecast/daily?lat=35&lon=139&cnt=10&appid=f5494a7c084b83729a1ef81f70d182f6',
  )
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        throw new Error();
      }
      return response;
    })
    .then((res: WeatherResponse) => {
      dispatch({
        type: GET_WEATHER,
        payload: res,
      });
    })
    .catch(_ => {
      Alert.alert(
        'Error',
        'Error fetching data',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    });
};

// All Props
type WeatherProps = WeatherResponse;

// Initial State
export interface IWeatherObject {
  date: string;
  minTemperature: number;
  maxTemperature: number;
  weather: string;
}

const initialState = {
  weathers: {} as {[key: string]: IWeatherObject},
  dates: [] as string[],
};

type weather = typeof initialState;

const weather = (state = initialState, action: Actions<WeatherProps>) => {
  if (action.type === GET_WEATHER) {
    return weatherMemo(action.payload);
  }
  return state;
};

export {getWeather, weather};
