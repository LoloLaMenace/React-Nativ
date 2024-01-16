import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, ActivityIndicator, Image } from 'react-native';
import * as Location from 'expo-location';
import { format } from 'date-fns';
import CityLocation from './Components/CityLocationComponent';
import { FlatList } from 'react-native';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataDays, setDataDays] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=fa1a67d96cbb561d5f26fb34bd433537&units=metric&lang=fr`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching current weather data:', error);
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        const apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=fa1a67d96cbb561d5f26fb34bd433537&units=metric&lang=fr`;

        const response2 = await fetch(apiUrl2);
        const data2 = await response2.json();

        // Afficher les 8 premiers éléments
        const first8Forecast = data2.list.slice(0, 8);
        setDataDays(first8Forecast);
      } catch (error) {
        console.error('Error fetching weather forecast data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <ImageBackground source={require('./assets/back.jpg')} style={styles.container}>
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </ImageBackground>
    );
  }

  if (errorMsg) {
    return (
      <ImageBackground source={require('./assets/back.jpg')} style={styles.container}>
        <View style={styles.container1}>
          <Text style={styles.textPrevi}>{errorMsg}</Text>
        </View>
      </ImageBackground>
    );
  } else if (weatherData) {
    const temperature = Math.round(weatherData.main.temp);
    const weatherDescription = weatherData.weather[0].description;
    const city = weatherData.name;
    const tempMax = Math.round(weatherData.main.temp_max);
    const tempMin = Math.round(weatherData.main.temp_min);

    return (
      <ImageBackground source={require('./assets/back.jpg')} style={styles.container}>
        <CityLocation
          city={city}
          temperature={temperature}
          weatherDescription={weatherDescription}
          tempMax={tempMax}
          tempMin={tempMin}
        />

        <View style={styles.container1}>
          <Text style={styles.textPrevi}>{`🕒 PREVISION DES 24H DERNIERE HEURE`}</Text>

          {/* FlatList pour le défilement horizontal */}
          <FlatList
            data={dataDays}
            horizontal
            keyExtractor={(item) => item.dt.toString()}
            renderItem={({ item }) => (
              <View style={styles.forecastItem}>
                <Text style={styles.forecastTime}>{format(new Date(item.dt * 1000), 'HH:mm')}</Text>
                <Image source={{ uri: `https://openweathermap.org/img/w/${item.weather[0].icon}.png` }} style={styles.weatherIcon} />
                <Text style={styles.forecastTemperature}>{`${Math.round(item.main.temp)}°C`}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.container1}>
          <Text style={styles.textPrevi}>{`🗓 PREVISION SUR 5 JOURS`}</Text>
          
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'rgba(62, 68, 89, 0.5)',
    borderRadius: 10,
  },
  textPrevi: {
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
    color: 'rgba(250, 250, 255, 0.5)',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  forecastItem: {
    margin: 7,
    padding: 7,
    alignItems: 'center',
  },
  forecastTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  forecastTemperature: {
    fontSize: 16,
    color: 'white',
  },
});
