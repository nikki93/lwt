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
  state = {
    recording: false,
  }

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

            borderWidth: this.state.recording ? 5 : 0,
            borderColor: 'black',
          }}
          onPress={this._onPress}
        />
      </LayoutView>
    );
  }

  _onPress = () => {
    const newRecording = !this.state.recording;
    this.setState({ recording: newRecording });
  }
}

class TimerScreen extends React.Component {
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
            />
            <RecordPanel
              color={'red'}
            />
          </LayoutView>

          <LayoutView style={{ height: 120 }} />
        </LayoutView>

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

