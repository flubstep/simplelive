import React, {
  PropTypes,
} from 'react'

import {
  Image,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'

import KeyboardResponsiveView from 'react-native-keyboard-responsive-view'
import dismissKeyboard from 'dismissKeyboard'

import Layout from '../constants/Layout'
import { Colors } from '../constants/Constants'
import { MonoText } from '../components/StyledText'
import {
  Text,
  SmallText,
  CenteredColumn,
  Button,
  DarkBackground,
  SmallIcon
} from '../components/Components'

import Api from '../api/Api'
import LiveRoom from '../api/LiveRoom'
  
import SubtopicCarousel from '../components/SubtopicCarousel'
import Animated from '../components/Animated'
import Username from '../components/Username'
import RoomPreview from '../components/RoomPreview'
import FacebookLoginButton from '../components/FacebookLoginButton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    width: 320,
    height: Layout.window.height - 217, // todo: keyboard size param
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 48,
    width: 320,
    backgroundColor: Colors.white,
    color: Colors.black,
    borderRadius: 4,
    paddingLeft: 16,
    paddingRight: 16
  },
  centered: {
    textAlign: 'center'
  },
  section: {
    marginTop: 6,
    marginBottom: 6
  },
  button: {
    width: 320
  },
  underline: {
    textDecorationLine: 'underline'
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  hr: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Colors.dark
  },
  or: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16
  }
})

export default class MeditationRoomScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      inputting: false
    }
  }

  onFocus = () => {
    this.setState({
      inputting: true
    })
  }

  onBlur = () => {
    this.setState({
      inputting: false
    })
  }

  submit = () => {
    console.log('okay')
  }

  render() {
    return (
      <DarkBackground>
        <KeyboardResponsiveView style={styles.container}>
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.content}>
              <View style={styles.section}>
                <FacebookLoginButton />
              </View>
              <View style={styles.section}>
                <SmallText style={styles.centered}>(We'll never post anything without your permission)</SmallText>
              </View>
              <View style={[styles.section, styles.separator]}>
                <View style={styles.hr} />
                <SmallText style={[styles.centered, styles.or]}>OR</SmallText>
                <View style={styles.hr} />
              </View>
              <View style={styles.section}>
                <TextInput
                  style={styles.input}
                  onChangeText={(email) => this.setState({email})}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  value={this.state.email}
                  keyboardType={"email-address"}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  placeholder={'EMAIL'}
                  >
                </TextInput>
              </View>
              <View style={styles.section}>
                <TextInput
                  style={styles.input}
                  onChangeText={(password) => this.setState({password})}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  value={this.state.password}
                  secureTextEntry={true}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  placeholder={'PASSWORD'}
                  >
                </TextInput>
              </View>
              <View style={styles.section}>
                <Button
                  disabled={!(this.state.email.length > 0 && this.state.password.length >= 6)}
                  style={styles.button}
                  onPress={this.submit}
                  >
                  SIGN IN
                </Button>
              </View>
              <View style={styles.section}>
                <SmallText style={styles.underline}>Forgot password?</SmallText>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardResponsiveView>
      </DarkBackground>
    );
  }
}
