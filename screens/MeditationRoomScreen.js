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

import Layout from '../constants/Layout'
import { Colors } from '../constants/Constants'
import { MonoText } from '../components/StyledText'
import {
  Text,
  SmallText,
  CenteredColumn,
  Button,
  DarkBackground,
  Icon,
  SmallIcon
} from '../components/Components'

import Api from '../api/Api'
import LiveRoom from '../api/LiveRoom'
import UserStatus from '../api/UserStatus'

import SubtopicCarousel from '../components/SubtopicCarousel'
import Animated from '../components/Animated'
import Username from '../components/Username'
import RoomPreview from '../components/RoomPreview'

import radioIcon from '../assets/images/live-radio@2x.png'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkest,
    paddingTop: 20 // todo: constants?
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: Colors.darker
  },
  icon: {
    height: 15,
    width: 23,
    marginRight: 8
  },
  description: {
    width: 268,
    textAlign: 'center'
  },
  roomsContainer: {
    marginTop: 16
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Layout.window.width,
    padding: 20,
    borderTopWidth: 1,
    borderColor: Colors.darker
  }
})

export default class MeditationRoomScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      subtopics: [],
      roomsLoaded: true,
      rooms: []
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.icon} source={radioIcon} />
          <SmallText>LIVE</SmallText>
        </View>
        <Animated.Upwards>
          <CenteredColumn>
            <SmallText style={styles.description}>
              Join or host a meditation session with your buddies.
            </SmallText>
            {
              this.state.roomsLoaded ? (
                <View style={styles.roomsContainer}>
                  {
                    this.state.rooms.map((room) => (
                      <RoomPreview key={room.id} room={room} />
                    ))
                  }
                </View>
              ) : null
            }
          </CenteredColumn>
        </Animated.Upwards>
        <View style={styles.bottom}>
          <Button style={{width: 300}} onPress={(e) => this.onPress(e)}>Host a session</Button>
        </View>
      </View>
    )
  }
}
