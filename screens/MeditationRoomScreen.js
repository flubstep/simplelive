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
import { Colors } from '../constants/Constants'
import { MonoText } from '../components/StyledText'
import {
  Text,
  CenteredColumn,
  Button,
  DarkBackground
} from '../components/Components'

import Api from '../api/Api'

import SubtopicSquare from '../components/SubtopicSquare'
import Animated from '../components/Animated'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkest,
  },
  carousel: {
  },
  carouselContainer: {
    height: 176 + 16*2,
    width: Layout.window.width,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.6)'
  }
})

export default class MeditationRoomScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      subtopics: []
    }
  }

  componentDidMount() {
    this.fetchSubtopics()
  }

  async fetchSubtopics() {
    let subtopics = await Api.subtopics.get({ enabled: true, show: true })
    this.setState({ subtopics })
  }

  render() {
    return (
      <DarkBackground>
        <CenteredColumn>
          <View style={styles.carouselContainer}>
            <ScrollView
              style={styles.carousel}
              horizontal={true}
              decelerationRate={"normal"}
              automaticallyAdjustInsets={false}
              showsHorizontalScrollIndicator={false}
              >
              {
                this.state.subtopics.map((s) => (
                  <Animated.Opacity key={s._id}>
                    <SubtopicSquare subtopic={s} />
                  </Animated.Opacity>
                ))
              }
            </ScrollView>
          </View>
          <Animated.Upwards>
            <Button onPress={() => { return false }}>HOST A NEW MEDITATION</Button>
          </Animated.Upwards>
        </CenteredColumn>
      </DarkBackground>
    );
  }
}
