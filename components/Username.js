/*
 * @providesModule Username
 */

'use strict';

import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native';

import {
  SmallIcon,
  Text
} from './Components'

import { css, g } from '../constants/Constants'

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Username = (props) => {
  let user = props.user
  let icon = g.STATIC_HOST + (props.host ? "/static/press/shape@2x.png" : "/static/press/group42@2x.png")
  return (
    <View key={user.name} style={styles.container}>
      <SmallIcon source={icon} />
      <Text>{user.name}</Text>
    </View>
  );
}

export default Username;