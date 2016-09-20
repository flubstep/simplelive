import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  Animated,
  TouchableHighlight
} from 'react-native'

import Exponent from 'exponent'

import UserStatus from '../api/UserStatus'

import { Text, SmallText } from './Components'
import { Colors, g, css } from '../constants/Constants'
import Layout from '../constants/Layout'

import fbLogo from '../assets/images/fb-logo-144.png'

let styles = StyleSheet.create({
  button: {
    backgroundColor: '#3B5998',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 320,
    borderRadius: 3
  },
  fbLogo: {
    width: 28,
    height: 28,
    marginRight: 8
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '700'
  }
})

export default class FacebookLoginButton extends React.Component {

  constructor(props) {
    super(props)
    this.login = () => this._login()
  }

  async _login() {
    let { type, token } = await Exponent.Facebook.logInWithReadPermissionsAsync(
      '755007247967450', {
        permissions: ['email']
      }
    )
    UserStatus.loginWithFacebook(token)
  }

  render() {
    return (
      <TouchableHighlight onPress={this.login}>
        <View style={styles.button}>
          <Image style={styles.fbLogo} source={fbLogo} />
          <SmallText style={styles.buttonText}>Continue with Facebook</SmallText>
        </View>
      </TouchableHighlight>
    )
  }
}