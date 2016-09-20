/*
 * @providesModule RoomPreview
 */

'use strict'

import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native'

import {
  Components
} from 'exponent';

import {
  SmallIcon,
  Button,
  SmallText,
  Text
} from './Components'
import Username from './Username'
import Animated from './Animated'

import fullImageUrl from '../helpers/fullImageUrl'

import { css, g } from '../constants/Constants'

let styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    padding: 16,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontWeight: '600'
  }
})

export default class RoomPreview extends React.Component {
  render() {
    let imageUrl = fullImageUrl(this.props.room.subtopic.image)
    let num = this.props.room.numParticipants
    return (
      <Animated.Upwards>
        <TouchableHighlight onPress={this.props.onPress}>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 327, height: 123, borderRadius: 3 }}
            >
            <Components.LinearGradient
              style={{ flex: 1 }}
              colors={[ "rgba(0,0,0,0.8)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)" ]}
            />
            <View style={[styles.container, { height: 123 } ]}>
              <View style={[styles.top, { width: 327-32 } ]}>
                <SmallText style={styles.title}>{this.props.room.subtopic.name}</SmallText>
                <SmallText>Live now!</SmallText>
              </View>
              <View style={styles.bottom}>
                <SmallIcon source={"/static/press/group42@2x.png"} />
                <SmallText style={{ marginLeft: 4 }}>{num} participant{num === 1 ? '' :'s'}</SmallText>
              </View>
            </View>
          </Image>
        </TouchableHighlight>
      </Animated.Upwards>
    )
  }
}
