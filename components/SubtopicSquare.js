import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import {
  Text,
  MediumText,
  CenteredRow
} from './Components'

import {
  Components
} from 'exponent';

import { range } from 'lodash';

import { Colors, g } from '../constants/Constants'

let styles = StyleSheet.create({
  outer: {
    height: 160 + 8*2,
    width: 160 + 8*2,
    padding: 8
  },
  square: {
    height: 160,
    width: 160,
    borderRadius: 8,
    marginRight: 4,
    marginLeft: 4
  },
  title: {
    position: 'absolute',
    top: 0,
    padding: 16
  },
  heavy: {
    fontWeight: '500'
  }
})

export default class SubtopicSquare extends React.Component {

  render() {
    let imageSource = { uri: g.IMAGE_BASE + this.props.subtopic.image }
    return (
      <TouchableHighlight onPress={this.props.onPress} style={[styles.outer]}>
        <Image {...this.props} source={imageSource} style={[styles.square]}>
          <Components.LinearGradient style={{ width: 160, height: 160 }} colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0)"]} />
          <View style={styles.title}>
            <MediumText style={styles.heavy}>{this.props.subtopic.name}</MediumText>
          </View>
        </Image>
      </TouchableHighlight>
    ) 
  }
}