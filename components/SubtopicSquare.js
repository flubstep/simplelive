import React from 'react'
import {
  View,
  Image,
  StyleSheet
} from 'react-native'

import {
  Text,
  MediumText,
  CenteredRow
} from './Components'

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

// todo: is this really stupid?
const makeLine = (height, width, opacity) => (
  <View
    key={opacity}
    style={{
      width: width,
      height: height,
      backgroundColor: 'rgba(0,0,0,' + opacity + ')'
    }}
  />
)

export default class SubtopicSquare extends React.Component {

  render() {
    let imageSource = { uri: g.IMAGE_BASE + this.props.subtopic.image }
    return (
      <View style={[styles.outer]}>
        <Image {...this.props} source={imageSource} style={[styles.square]}>
          { range(20, 120).map((i) => makeLine(1, 160, (120-i)/120)) }
          <View style={styles.title}>
            <MediumText style={styles.heavy}>{this.props.subtopic.name}</MediumText>
          </View>
        </Image>
      </View>
    ) 
  }
}