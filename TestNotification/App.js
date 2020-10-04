/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { View, Text} from 'react-native';

import Router from "./Router";

export default function App() {
  console.disableYellowBox = true;
  return (
    <View style={{ flex: 1 }}>
      <Router />
    </View>
  );
};