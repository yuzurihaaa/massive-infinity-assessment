import {Dispatch} from 'redux';

import {Actions} from './main';
import {WeatherResponse} from '../model';
import {convertTimeStampToIso, kelvinToCelcius, weatherMemo} from '../util';
import {Alert} from 'react-native';

// Action Names
const GET_WEATHER = 'GET_WEATHER';
const SET_SELECTED_WEATHER = 'SET_SELECTED_WEATHER';

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
      setSelectedWeather({
        date: convertTimeStampToIso(res.list[0].dt),
        maxTemperature: kelvinToCelcius(res.list[0].temp.max),
        minTemperature: kelvinToCelcius(res.list[0].temp.min),
        weather: res.list[0].weather[0].main,
      })(dispatch);
      dispatch({
        type: GET_WEATHER,
        payload: res,
      });
    })
    .catch(_ => {
      Alert.alert(
        'Error',
        'Error fetching data',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    });
};

const setSelectedWeather = (arg: IWeatherObject) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_SELECTED_WEATHER,
    payload: arg,
  });
};

// All Props
type WeatherProps = WeatherResponse & IWeatherObject;

// Initial State
export interface IWeatherObject {
  date: string;
  minTemperature: number;
  maxTemperature: number;
  weather: string;
}

const initialState = {
  selectedWeather: {} as IWeatherObject,
  weathers: {} as {[key: string]: IWeatherObject},
  dates: [] as string[],
};

type weather = typeof initialState;

const weather = (state = initialState, action: Actions<WeatherProps>) => {
  switch (action.type) {
    case GET_WEATHER: {
      return {
        ...state,
        ...weatherMemo(action.payload),
      };
    }
    case SET_SELECTED_WEATHER: {
      return {
        ...state,
        selectedWeather: action.payload,
      };
    }
    default:
      return state;
  }
};

export {getWeather, setSelectedWeather, weather};
