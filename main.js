/** In order for logging to stream to XDE or the exp CLI you must import the
  * exponent module at some point in your app */
import Exponent from 'exponent'

import React from 'react'
import {
  AppRegistry,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import {
  FontAwesome,
} from '@exponent/vector-icons'

import MeditationRoomScreen from './screens/MeditationRoomScreen'
import LoginScreen from './screens/LoginScreen'
import cacheAssetsAsync from './utilities/cacheAssetsAsync'

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  }

  componentWillMount() {
    this._loadAssetsAsync()
  }

  async _loadAssetsAsync() {
    await cacheAssetsAsync({
      images: [
        require('./assets/images/exponent-wordmark.png'),
        require('./assets/images/fb-logo-144.png')
      ],
      fonts: [
        FontAwesome.font,
        {'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')},
      ],
    })

    this.setState({appIsReady: true})
  }

  render() {
    if (this.state.appIsReady) {
      let { notification } = this.props.exp
      return (
        <LoginScreen />
      )
    } else {
      return <Exponent.Components.AppLoading />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
})

AppRegistry.registerComponent('main', () => AppContainer)
