import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableHighlight
} from 'react-native';

import { css } from '../constants/Constants';
import Layout from '../constants/Layout';

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
    borderColor: '#FFFFFF',
    borderWidth: 1.2,
    borderRadius: 16,
    padding: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center'
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
    backgroundColor: 'red'
  },
  darkOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  lightOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)'
  }
})

export class CenteredRow extends React.Component {
  render() {
    return (
      <View {...this.props} style={[this.props.style, styles.centeredRow]}>
        { this.props.children }
      </View>
    )
  }
}

export class CenteredColumn extends React.Component {
  render() {
    return (
      <View {...this.props} style={[this.props.style, styles.centeredColumn]}>
        { this.props.children }
      </View>
    )
  }
}

// todo: button
export class Button extends React.Component {
  render() {
    return (
      <TouchableHighlight {...this.props} style={[this.props.style, styles.button]}>
        <View>
          <SmallText style={[styles.buttonText, styles.heavy]}>{ this.props.children }</SmallText>
        </View>
      </TouchableHighlight>
    )
  }
}

export class SmallText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[this.props.style, styles.baseText, styles.smallText]}>
        { this.props.children }
      </Text>
    );
  }
}

export class MediumText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[this.props.style, styles.baseText, styles.mediumText]}>
        { this.props.children }
      </Text>
    );
  }
}

export class LargeText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[this.props.style, styles.baseText, styles.largeText]}>
        { this.props.children }
      </Text>
    );
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

export { Text_ as Text };

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
  source: { uri: "http://simplehabit.press/static/onboarding-bg-1.png" }
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
  source: { uri: "http://simplehabit.press/static/onboarding-bg-1.png" }
}
