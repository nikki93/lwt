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

const startState = {
  done: false,
  totalTime: 0,
  recording: 'none',
  times: {
    red: 0,
    blue: 0,
  },
}

class TimerScreen extends React.Component {
  state = startState

  render() {
    const totalTime = this.state.times.blue + this.state.times.red;
    const blueFrac = totalTime > 0 ? this.state.times.blue / totalTime : 1;
    const redFrac = totalTime > 0 ? this.state.times.red / totalTime : 1;

    return this.state.done ? (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          padding: 5,
        }}>
        <LayoutView
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
          }}>
          <Text style={{ fontSize: 42 }}>
            Blues spoke {(blueFrac * 100).toFixed(2)}% of the time!
          </Text>
        </LayoutView>
        <LayoutView style={{
          flex: 1,
          flexDirection: 'row',
          padding: 40,
        }}>
          <View style={{ backgroundColor: 'blue', flex: blueFrac }} />
          <View style={{ backgroundColor: 'red', flex: redFrac }} />
        </LayoutView>
        <LayoutView
          style={{
            flex: 1,
          }}>
          <TouchableOpacity
            style={{
              margin: 20,
              backgroundColor: '#ddddff',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => this.setState(startState)}>
            <Text style={{ fontSize: 36}}>
              Again!
            </Text>
          </TouchableOpacity>
        </LayoutView>
      </View>
    ) : (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          padding: 5,
        }}>

        <LayoutView
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 72 }}>
            {this.state.totalTime.toFixed(0)}
          </Text>
        </LayoutView>

        <LayoutView style={{flex: 1 }}>
          <LayoutView
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <RecordPanel
              color={'blue'}
              recording={this.state.recording == 'blue'}
              onPress={this._onRecordingPress('blue')}
            />
            <RecordPanel
              color={'red'}
              recording={this.state.recording == 'red'}
              onPress={this._onRecordingPress('red')}
            />
          </LayoutView>

          <LayoutView
            style={{
              height: 120,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                margin: 20,
                backgroundColor: '#ddddff',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={this._onRecordingPress('done')}>
              <Text style={{ fontSize: 36}}>
                Done!
              </Text>
            </TouchableOpacity>
          </LayoutView>
        </LayoutView>

      </View>
    );
  }

  _onRecordingPress = (color) => {
    return () => {
      const now = 0.001 * Date.now();
      const lastColor = this.state.recording;

      const nextTimes = { ...this.state.times };
      if (lastColor !== 'none') {
        nextTimes[lastColor] = nextTimes[lastColor] + now - this.state.startTime;
      }

      if (color === 'done' || this.state.recording === color) {
        this.setState({
          recording: 'none',
          startTime: null,
          times: nextTimes,
          done: color === 'done',
        });
        if (this._timeout) {
          clearTimeout(this.timeout);
        }
      } else {
        this.setState({
          recording: color,
          startTime: now,
          times: nextTimes,
        });
        this._setTimer();
      }
    };
  }

  _setTimer = () => {
    if (!this._timeout) {
      this._timeout = setTimeout(this._onTimer, 350);
    }
  }

  _onTimer = () => {
    this._timeout = null;
    if (this.state.recording !== 'none') {
      this.setState({
        totalTime: this.state.times.blue + this.state.times.red + 0.001 * Date.now() - this.state.startTime,
      })
      this._setTimer();
    }
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

