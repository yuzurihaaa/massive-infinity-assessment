import React, {useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder-reborn';
import {useDispatch, useSelector} from 'react-redux';

import {orangeRed} from '../res/colors';
import {getWeather, IWeatherObject, State} from '../redux';
import {AppBar, LineSeparator, WeatherItem} from './_home';
import {convertTimeToFormat} from '../util';

const Home = () => {
  const weatherState: IWeatherObject[] = useSelector((state: State) =>
    state.weather.dates.map(date => state.weather.weathers[date]),
  );

  const weatherMemo = useMemo(() => weatherState, [weatherState]);

  const dispatcher = useDispatch();

  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [selectedWeather, setSelectedWeather] = useState({} as IWeatherObject);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      const position = {
        lat: info.coords.latitude,
        lng: info.coords.longitude,
      };
      Geocoder.geocodePosition(position).then(data => {
        // Is the first one the nearest?
        const firstCountryCode = data[0].countryCode;
        const firstCountryName = data[0].country;
        setCountry(firstCountryName);
        setCountryCode(firstCountryCode);
      });
      dispatcher(getWeather());
    });
  }, [dispatcher]);

  useEffect(() => {
    const shouldSetFirstData =
      weatherMemo.length && Object.entries(selectedWeather).length === 0;
    if (shouldSetFirstData) {
      setSelectedWeather(weatherMemo[0]);
    }
  }, [selectedWeather, weatherMemo, weatherMemo.length, weatherState.length]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={orangeRed} />
      <AppBar title={country} />
      {weatherState.length ? (
        <SafeAreaView>
          <View style={styles.topItem}>
            <Text style={styles.dateText}>
              {convertTimeToFormat(
                selectedWeather.date,
                'ddd, DD MMM YYYY HH:mm A',
              )}{' '}
              {countryCode}
            </Text>
            <Text style={styles.precipitateText}>
              {selectedWeather.maxTemperature}
            </Text>
            <Text style={styles.weatherText}>{selectedWeather.weather}</Text>
          </View>
          <FlatList
            data={weatherState}
            keyExtractor={item => item.date}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => setSelectedWeather(item)}>
                <WeatherItem {...item} />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={LineSeparator}
          />
        </SafeAreaView>
      ) : (
        <View />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  topItem: {
    alignItems: 'center',
    padding: 16,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  precipitateText: {
    fontSize: 45,
  },
  weatherText: {
    fontSize: 16,
    color: '#778899',
  },
});

export default Home;
