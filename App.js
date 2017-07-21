import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Expo from 'expo';

class LayoutView extends React.Component {
  render() {
    return (
      <View
        {...this.props}
        style={[this.props.style, {
            borderWidth: 1,
            borderColor: 'green',
          }]}
      />
    );
  }
}

const buttonWidth = 0.33 * Dimensions.get('window').width;

class RecordPanel extends React.Component {
  render() {
    return (
      <LayoutView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: this.props.color,
            borderRadius: 0.5 * buttonWidth,
            width: buttonWidth,
            height: buttonWidth,

            borderWidth: this.props.recording ? 5 : 0,
            borderColor: 'black',
          }}
          onPress={this.props.onPress}
        />
      </LayoutView>
    );
  }
}

class TimerScreen extends React.Component {
  state = {
    blue: {
      recording: false,
    },
    red: {
      recording: false,
    },
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          padding: 5,
        }}>

        <LayoutView style={{ flex: 1 }} />

        <LayoutView style={{flex: 1 }}>
          <LayoutView
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <RecordPanel
              color={'blue'}
              recording={this.state.blue.recording}
              onPress={this._onRecordingPress('blue')}
            />
            <RecordPanel
              color={'red'}
              recording={this.state.red.recording}
              onPress={this._onRecordingPress('red')}
            />
          </LayoutView>

          <LayoutView style={{ height: 120 }} />
        </LayoutView>

      </View>
    );
  }

  _onRecordingPress = (color) => {
    const otherColor = color === 'red' ? 'blue' : 'red';

    return () =>
      this.setState({
        [color]: {
          recording: !this.state[color].recording,
        },
        [otherColor]: {
          recording: false,
        }
      });
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

