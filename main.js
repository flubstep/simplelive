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

import UserStatus from './api/UserStatus'
import MeditationRoomScreen from './screens/MeditationRoomScreen'
import LoginScreen from './screens/LoginScreen'
import cacheAssetsAsync from './utilities/cacheAssetsAsync'

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
    userInfo: null
  }

  componentWillMount() {
    this._loadAssetsAsync()
    UserStatus.subscribe((userInfo) => {
      this.setState({
        userInfo: userInfo
      })
    })
  }

  async _loadAssetsAsync() {
    await cacheAssetsAsync({
      images: [
        require('./assets/images/exponent-wordmark.png'),
        require('./assets/images/fb-logo-144.png'),
        require('./assets/images/onboarding-bg-1.png')
      ],
      fonts: [
        FontAwesome.font,
        {'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')},
      ],
    })

    this.setState({appIsReady: true})
  }

  render() {
    if (this.state.appIsReady && this.state.userInfo) {
      let { notification } = this.props.exp
      if (this.state.userInfo._id) {
        return <MeditationRoomScreen />
      } else {
        return (
          <LoginScreen />
        )
      }
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
