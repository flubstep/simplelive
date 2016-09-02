/*
 * @providesModule RoomPreview
 */

'use strict';

import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native';

import {
  SmallIcon,
  Button,
  Text
} from './Components'
import Username from './Username';

import { css, g } from '../constants/Constants'

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default class RoomPreview extends React.Component {
  render() {
    return (
      <View style={{ width: 280, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{ alignItems: 'flex-start' }}>
          <Username host={true} user={this.props.room.host} />
          <View style={styles.container}>
            <SmallIcon source={"/static/press/group42@2x.png"} />
            <Text>{this.props.room.numParticipants} participants</Text>
          </View>
        </View>
        <Button onPress={() => {}}>JOIN</Button>
      </View>
    )
  }
}
