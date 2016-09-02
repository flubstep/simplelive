import React from 'react';
import {
  Animated
} from 'react-native';

import { keys } from 'lodash';

class Opacity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(1)
    }
  }

  componentDidMount() {
    this.state.opacity.setValue(0.01)
    Animated.timing(
      this.state.opacity, { toValue: 1, friction: 1 }
    ).start()
  }

  render() {
    return (
      <Animated.View style={[{
        opacity: this.state.opacity
      }, this.props.style]}>
        { this.props.children }
      </Animated.View>
    )
  }
}

class Upwards extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(1)
    }
  }

  componentDidMount() {
    this.state.translateY.setValue(this.props.dy)
    this.state.opacity.setValue(0.01)
    Animated.parallel([
      Animated.timing(
        this.state.translateY, { toValue: 0, friction: 1 }
      ),
      Animated.timing(
        this.state.opacity, { toValue: 1, friction: 1 }
      )
    ]).start()
  }

  render() {
    return (
      <Animated.View style={[{
        opacity: this.state.opacity,
        transform: 
          [{
            translateY: this.state.translateY
          }]
        }, this.props.style]}>
        { this.props.children }
      </Animated.View>
    )
  }
}
Upwards.defaultProps = {
  dy: 10
}

export default {
  Opacity,
  Upwards
}