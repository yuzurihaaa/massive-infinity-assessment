export interface City {
  geoname_id: number;
  name: string;
  lat: number;
  lon: number;
  country: string;
  iso2: string;
  type: string;
  population: number;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface List {
  dt: number;
  temp: Temp;
  pressure: number;
  humidity: number;
  weather: Weather[];
  speed: number;
  deg: number;
  clouds: number;
  rain?: number;
  snow?: number;
}

export interface WeatherResponse {
  cod: string;
  message: number;
  city: City;
  cnt: number;
  list: List[];
}
