import React from 'react';
import { Text, View, StyleSheet} from 'react-native';

const CityLocation =({city, temperature, weatherDescription, tempMax, tempMin}) => {
    return (
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
          <Text style={styles.temperatureText}>{`${temperature}°`}</Text>
        </View>
        <View style={styles.cityContainer}>
          <Text style={styles.cityText}>{weatherDescription}</Text>
        </View>
        <View style={styles.tempMinMaxContainer}>
          <Text style={styles.tempMinMaxText}>{`↑ ${tempMax}°`}</Text>
          <Text style={styles.tempMinMaxText}>{`↓ ${tempMin}°`}</Text>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container1: {
        marginTop: 50,
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
      },
      temperatureText: {
        color: 'white',
        fontSize: 40,
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

export default CityLocation;