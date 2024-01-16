import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=fa1a67d96cbb561d5f26fb34bd433537&units=metric&lang=fr`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
    })();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (weatherData) {
    const temperature = Math.round(weatherData.main.temp);
    const weatherDescription = weatherData.weather[0].description;
    const weatherIcon = weatherData.weather[0].icon;
    const city = weatherData.name;
    const tempMax = Math.round(weatherData.main.temp_max);
    const tempMin = Math.round(weatherData.main.temp_min);

    return (
      <ImageBackground
        source={require('./assets/back.jpg')}
        style={styles.container}
      >
        <View style={styles.container1}>
          <View style={styles.locationContainer}>
            <View style={styles.cityContainer}>
              <Text style={styles.cityText}>{city}</Text>
            </View>
            <View style={styles.cityContainer}>
              <Text style={styles.locationText}>Ma position</Text>
            </View>
          </View>
          <View style={styles.weatherInfoContainer}>
            <Text style={styles.temperatureText}>{`${temperature}°C`}</Text>
            {/* <Image
              source={{ uri: `https://openweathermap.org/img/w/${weatherIcon}.png` }}
              style={styles.weatherIcon}
            /> */}
          </View>
          <View style={styles.cityContainer}>
            <Text style={styles.cityText}>{weatherDescription}</Text>
          </View>
          <View style={styles.tempMinMaxContainer}>
            <Text style={styles.tempMinMaxText}>{`↑ ${tempMax}°C`}</Text>
            <Text style={styles.tempMinMaxText}>{`↓ ${tempMin}°C`}</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('./assets/back.jpg')}
      style={styles.container}
    >
      <View style={styles.container1}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    marginTop: 50,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    color: 'white',
  },
  temperatureText: {
    color: 'white',
    fontSize: 40,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  locationContainer: {
    marginVertical: 10,
  },
  locationText: {
    color: 'white',
    fontSize: 18,
    alignItems: 'center',

  },
  weatherInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  cityText: {
    color: 'white',
    fontSize: 24,
  },
  tempMinMaxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tempMinMaxText: {
    color: 'white',
    fontSize: 16,
  },
});
