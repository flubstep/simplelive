import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  Animated,
  TouchableHighlight
} from 'react-native'

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

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.button}>
          <Image style={styles.fbLogo} source={fbLogo} />
          <SmallText style={styles.buttonText}>Continue with Facebook</SmallText>
        </View>
      </TouchableHighlight>
    )
  }
}