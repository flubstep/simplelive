import React, {
  PropTypes,
} from 'react'

import {
  Image,
  StyleSheet,
  View,
  ScrollView
} from 'react-native'

import Layout from '../constants/Layout'
import SubtopicSquare from './SubtopicSquare'
import Animated from './Animated'

let styles = StyleSheet.create({
  carousel: {
  },
  container: {
    height: 176 + 16*2,
    width: Layout.window.width,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.6)'
  }
})

export default class SubtopicCarousel extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.carousel}
          horizontal={true}
          decelerationRate={"normal"}
          automaticallyAdjustInsets={false}
          showsHorizontalScrollIndicator={false}
          >
          {
            this.props.subtopics.map((s) => (
              <Animated.Opacity key={s._id}>
                <SubtopicSquare subtopic={s} />
              </Animated.Opacity>
            ))
          }
        </ScrollView>
      </View>
    )
  }
}

SubtopicCarousel.defaultProps = {
  subtopics: []
}