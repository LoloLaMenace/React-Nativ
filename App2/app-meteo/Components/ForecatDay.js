import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { format } from 'date-fns';
import { FlatList } from 'react-native';

const ForecastDay =({day, dayData}) => {
    return (
<View style={styles.container1}>
              <View key={day} style={styles.forecastDayContainer}>
                <Text style={styles.forecastDay}>{format(new Date(day), 'EEEE')}</Text>
                <FlatList
                  data={dayData}
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
            </View>
    );
};

const styles = StyleSheet.create({
    container1: {
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: 'rgba(62, 68, 89, 0.5)',
      borderRadius: 10,
    },
    forecastItem: {
      margin: 7,
      padding: 7,
      alignItems: 'center',
    },
    forecastDayContainer: {
      marginBottom: 10,
    },
    forecastDay: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 5,
      marginTop: 5,
      marginLeft: 10,
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
  

  export default ForecastDay;