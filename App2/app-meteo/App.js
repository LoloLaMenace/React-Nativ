import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, ActivityIndicator, Image, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { format } from 'date-fns';
import CityLocation from './Components/CityLocationComponent';
import { FlatList } from 'react-native';
import ForecastDay from './Components/ForecatDay';

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
        setErrorMsg('La permission d\'accéder à la localisation a été refusée');
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
        console.error('Erreur lors de la récupération des données météorologiques actuelles :', error);
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        const apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=fa1a67d96cbb561d5f26fb34bd433537&units=metric&lang=fr`;

        const response2 = await fetch(apiUrl2);
        const data2 = await response2.json();

        const groupedData = groupForecastDataByDay(data2.list);
        setDataDays(groupedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des prévisions météorologiques :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="black" />
        </View>
    );
  }

  if (errorMsg) {
    return (
      <ImageBackground source={require('./assets/default_background.jpg')} style={styles.container}>
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
    const weatherIcon = weatherData.weather[0].icon;
    const backgroundImage = getBackgroundImageByIcon(weatherIcon);
    return (
      <ImageBackground source={backgroundImage} style={styles.container}>
        <CityLocation
          city={city}
          temperature={temperature}
          weatherDescription={weatherDescription}
          tempMax={tempMax}
          tempMin={tempMin}
          weatherIcon={weatherIcon}
        />
        <View style={styles.container2}>
          <Text style={styles.textPrevi}>{`🕒 PRÉVISION DES 5 DERNIÈRE JOUR`}</Text>
        </View>
        <ScrollView >
          

          {Object.entries(dataDays).map(([day, dayData]) => (
            <ForecastDay day={day} dayData={dayData}/>
          ))}
        </ScrollView>
      </ImageBackground>
    );
  }
}

const getBackgroundImageByIcon = (weatherIcon) => {
  switch (weatherIcon) {
    case '01d':
      return require('./assets/clear_sky_day.jpg');
    case '01n':
      return require('./assets/clear_sky_night.jpg');
    case '02d':
      return require('./assets/few_clouds_day.jpg');
    case '02n':
      return require('./assets/few_clouds_night.jpg');
    case '03d':
      return require('./assets/scattered_clouds_day.jpg');
    case '03n':
      return require('./assets/scattered_clouds_night.jpg');
    case '04d':
      return require('./assets/broken_clouds_day.jpg');
    case '04n':
      return require('./assets/broken_clouds_night.jpg');
    case '09d':
      return require('./assets/showers_day.jpg');
    case '09n':
      return require('./assets/showers_night.jpg');
    case '10d':
      return require('./assets/showers_day.jpg');
    case '10n':
      return require('./assets/showers_night.jpg');
    case '11d':
      return require('./assets/thunderstorm_day.jpg');
    case '11n':
      return require('./assets/thunderstorm_night.jpg');
    case '13d':
      return require('./assets/snow_day.jpg');
    case '13n':
      return require('./assets/snow_night.jpg');
    case '50d':
      return require('./assets/mist_day.jpg');
    case '50n':
      return require('./assets/mist_night.jpg');
    default:
      return require('./assets/clear_sky_day.jpg');
  }
};


const groupForecastDataByDay = (forecastData) => {
  const groupedData = {};
  forecastData.forEach((item) => {
    const date = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(item);
  });
  return groupedData;
};

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
    marginTop: 50,
    marginLeft: 5,
    marginBottom: 50,
    color: 'rgba(250, 250, 255, 0.5)',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2:{
    display: 'flex',
    alignItems: 'center'
  },
});
