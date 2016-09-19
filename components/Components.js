import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableHighlight
} from 'react-native'

import { Colors, g, css } from '../constants/Constants'
import Layout from '../constants/Layout'

import backgroundImage from '../assets/images/onboarding-bg-1.png'

let styles = StyleSheet.create({

  centeredRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  centeredColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    backgroundColor: Colors.teal,
    borderWidth: 1.2,
    borderRadius: 3,
    padding: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    fontSize: 18,
    color: Colors.white
  },

  disabledButton: {
    opacity: 0.5
  },

  baseText: {
    fontFamily: "Avenir Book",
    color: '#FFFFFF'
  },

  smallText: {
    fontSize: 16
  },
  mediumText: {
    fontSize: 20,
  },
  largeText: {
    fontSize: 24
  },
  normal: {
    fontWeight: '300'
  },
  medium: {
    fontWeight: '400'
  },
  heavy: {
    fontWeight: '500'
  },

  background: {
    flex: 1,
    backgroundColor: 'red',
    height: Layout.window.height,
    width: Layout.window.width
  },
  darkOverlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height: Layout.window.height,
    width: Layout.window.width,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  lightOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)'
  },

  smallIconContainer: {
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    marginRight: 4
  },
  smallIcon: {
    height: 12,
    width: 12
  },
  iconContainer: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    height: 24,
    width: 24
  }

})

export class CenteredRow extends React.Component {
  render() {
    return (
      <View {...this.props} style={[styles.centeredRow, this.props.style]}>
        { this.props.children }
      </View>
    )
  }
}

export class CenteredColumn extends React.Component {
  render() {
    return (
      <View {...this.props} style={[styles.centeredColumn, this.props.style]}>
        { this.props.children }
      </View>
    )
  }
}

// todo: button
export class Button extends React.Component {
  render() {
    if (this.props.disabled) {
      return (
        <View {...this.props} style={[this.props.style, styles.button, styles.disabledButton]}>
          <SmallText style={[styles.buttonText, styles.heavy]}>{ this.props.children }</SmallText>
        </View>
      )
    } else {
      return (
        <TouchableHighlight {...this.props} style={[this.props.style, styles.button]}>
          <View>
            <SmallText style={[styles.buttonText, styles.heavy]}>{ this.props.children }</SmallText>
          </View>
        </TouchableHighlight>
      )
    }
  }
}

export class SmallText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[styles.baseText, styles.smallText, this.props.style]}>
        { this.props.children }
      </Text>
    )
  }
}

export class MediumText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[styles.baseText, styles.mediumText, this.props.style]}>
        { this.props.children }
      </Text>
    )
  }
}

export class LargeText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[styles.baseText, styles.largeText, this.props.style]}>
        { this.props.children }
      </Text>
    )
  }
}

class Text_ extends React.Component {
  render() {
    if (this.props.size === 'small') {
      return <SmallText {...this.props}>{this.props.children}</SmallText>
    } else if (this.props.size === 'medium') {
      return <MediumText {...this.props}>{this.props.children}</MediumText>
    } else if (this.props.size === 'large') {
      return <LargeText {...this.props}>{this.props.children}</LargeText>
    } else {
      return <MediumText {...this.props}>{this.props.children}</MediumText>
    }
  }
}
Text_.defaultProps = {
  size: 'medium'
}

export { Text_ as Text }

export class SmallIcon extends React.Component {
  render() {
    let source = this.props.source
    if (!source.startsWith('http')) {
      source = g.STATIC_HOST + source
    }
    return (
      <View style={styles.smallIconContainer}>
        <Image source={{ uri: source }} style={styles.smallIcon} />
      </View>
    )
  }
}

export class Icon extends React.Component {
  render() {
    let source = this.props.source
    if (!source.startsWith('http')) {
      source = g.STATIC_HOST + source
    }
    return (
      <View style={styles.iconContainer}>
        <Image source={{ uri: source }} style={styles.icon} />
      </View>
    )
  }
}


export class DarkBackground extends React.Component {
  render() {
    return (
      <Image 
        source={this.props.source}
        style={[this.props.style, styles.background]}
        >
        <View style={[styles.darkOverlay]}>
          { this.props.children }
        </View>
      </Image>
    )
  }
}
DarkBackground.defaultProps = {
  source: backgroundImage
}

export class LightBackground extends React.Component {
  render() {
    return (
      <View {...this.props} style={[this.props.style, styles.background]}>
        { this.props.children }
      </View>
    )
  }
}
LightBackground.defaultProps = {
  source: backgroundImage
}

