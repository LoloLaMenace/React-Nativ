import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback, StatusBar } from 'react-native';

const Test = () => {
  const [rippleOverflow, setRippleOverflow] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => {setRippleOverflow(!rippleOverflow);}}
        background={TouchableNativeFeedback.Ripple('#800080', rippleOverflow)}>
        <View style={styles.touchable}>
          <Text style={styles.text}>TouchableNativeFeedback</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  touchable: {
    flex: 0.5,
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    alignSelf: 'center',
  },
});

export default Test;
