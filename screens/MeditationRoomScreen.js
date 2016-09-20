import React, {
  PropTypes,
} from 'react'

import {
  Image,
  StyleSheet,
  View,
  ScrollView
} from 'react-native'

import Swiper from 'react-native-swiper'

import { Colors } from '../constants/Constants'
import { MonoText } from '../components/StyledText'
import {
  Text,
  CenteredColumn,
  Button,
  DarkBackground,
  SmallIcon
} from '../components/Components'

import Api from '../api/Api'
import LiveRoom from '../api/LiveRoom'
import UserStatus from '../api/UserStatus'

import SubtopicCarousel from '../components/SubtopicCarousel'
import Animated from '../components/Animated'
import Username from '../components/Username'
import RoomPreview from '../components/RoomPreview'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkest,
  }
})

export default class MeditationRoomScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      subtopics: [],
      roomsLoaded: true,
      rooms: [{ id: 'abc', host: { name: "Blarn"}, numParticipants: 3 }]
    }
  }

  componentDidMount() {
    this.fetchSubtopics()
    LiveRoom.onRoomList((rooms) => {
      this.setState({ roomsLoaded: true, rooms: rooms })
    })
  }

  async fetchSubtopics() {
    let subtopics = await Api.subtopics.get({ enabled: true, show: true })
    this.setState({ subtopics: subtopics.slice(0, 15) })
  }

  onPress(e) {
    this.setState({
      currentIndex: 1
    })
  }

  render() {
    return (
      <DarkBackground>
        <Swiper
          horizontal={false}
          loop={false}
          showsPagination={false}
          index={0}
          >
          <CenteredColumn style={{ justifyContent: 'space-around' }}>
            {
              this.state.roomsLoaded ? (
                <View>
                  {
                    this.state.rooms.map((room) => (
                      <RoomPreview key={room.id} room={room} />
                    ))
                  }
                </View>
              ) : null
            }
            <Animated.Upwards>
              <Button onPress={(e) => this.onPress(e)}>HOST A NEW SESSION</Button>
            </Animated.Upwards>
            <Animated.Upwards>
              <Button onPress={() => UserStatus.logout()}>LOGOUT</Button>
            </Animated.Upwards>
          </CenteredColumn>
          <CenteredColumn>
            <SubtopicCarousel subtopics={this.state.subtopics} />
          </CenteredColumn>
        </Swiper>
      </DarkBackground>
    );
  }
}
