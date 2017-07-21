import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Expo from 'expo';

class TimerScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          padding: 5,
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'green',
            flex: 1,
          }}
        />
        <View
          style={{
            borderWidth: 1,
            borderColor: 'green',
            flex: 1,
          }}
        />
      </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: Expo.Constants.statusBarHeight,
        }}>
        <TimerScreen />
      </View>
    );
  }
}

