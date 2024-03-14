import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../../config/theme/app-theme';

export const CalculatorScreen = () => {
  return (
    <View>
      <Text style={styles.mainResult}>1500</Text>
      <Text style={styles.subResult}>15</Text>
    </View>
  );
};
