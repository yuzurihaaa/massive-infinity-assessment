import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {orangeRed} from '../res/colors';
import {IWeatherObject} from '../redux';
import {convertTimeToFormat} from '../util';

const AppBar = ({title}: {title: String}) => (
  <View style={styles.appBar}>
    <Text style={styles.appBarText}>{title}</Text>
  </View>
);

const WeatherItem = (arg: IWeatherObject) => (
  <View style={styles.parent}>
    <View style={styles.rightItem}>
      <Text style={styles.title}>
        {convertTimeToFormat(arg.date, 'DD MMM YYYY, ddd')}
      </Text>
      <Text style={styles.subTitle}>
        {arg.minTemperature} - {arg.maxTemperature}
      </Text>
      <Text style={styles.details}>{arg.weather}</Text>
    </View>
    <Image
      style={styles.image}
      source={{
        uri:
          'https://cdn3.iconfinder.com/data/icons/arrows-219/24/chevron-right-512.png',
      }}
    />
  </View>
);

const LineSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: orangeRed,
    alignItems: 'center',
    padding: 16,
  },
  appBarText: {
    color: 'white',
  },
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    margin: 15,
    tintColor: orangeRed,
  },
  rightItem: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#696969',
  },
  details: {
    color: '#778899',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#D3D3D3',
  },
});

export {LineSeparator, WeatherItem, AppBar};
