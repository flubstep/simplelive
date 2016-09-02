/*
 * @providesModule Constants
 */

const Globals = {
  STRIPE_PUBLIC_KEY: "pk_test_7nhPM5nEnJXyCsynqWj6QuVQ",
  BASE_API_URL: process.env.BASE_API_URL || 'https://dev-guarded-dawn-91257.herokuapp.com',
  IMAGE_BASE: "https://bucketeer-760d0a32-a78c-4335-9090-9206d2933331.s3.amazonaws.com/",
  DOWNLOAD_APP_HREF: "https://itunes.apple.com/app/apple-store/id1093360165?pt=118159503&ct=website%20preview&mt=8",
  PODCAST_SUBTOPIC_ID: '575b1d0ad3045a03006fc0c1',
  USE_FULLSCREEN: true,
  LEFT_MENU_WIDTH: 0,
  TOP_MENU_HEIGHT: 48,
  CAROUSEL_GUTTER: 48,
  MARGIN_BASE: 8
}

function s(...args) {
  return Object.assign({}, ...args);
}

const M = Globals.MARGIN_BASE;

const Colors = {
  teal: '#3FC0C7',
  blue1: '#20BDC3',
  blue2: '#34A9B4',
  blue3: '#44D1CE',
  darkest: '#1C222E',
  darker: '#293343',
  dark: '#373F4E',
  gray: '#B9BDC5',
  white: '#FFFFFF',
  black: '#222222',
  red: '#FD9074',
  transparent: 'rgba(0,0,0,0.0)'
}

const BaseStyles = {
  font: {
    fontFamily: "'Avenir Book', 'Avenir', 'Helvetica', 'Arial', sans-serif"
  },
  h1: {
    fontWeight: 500,
    fontSize: 20,
    lineHeight: '28px',
    letterSpacing: -0.3
  },
  smallText: {
    fontSize: 12,
    fontWeight: 100
  },
  mediumText: {
    fontSize: 14,
    fontWeight: 200,
    letterSpacing: 0.3
  },
  largeText: {
    fontSize: 24,
    fontWeight: 200,
    marginTop: 24,
    marginBottom: 24
  },
  t: {
    large: {
      fontSize: 20,
      fontWeight: 300
    },
    medium: {
      fontSize: 18,
      fontWeight: 300
    },
    small: {
      fontSize: 14,
      fontWeight: 200
    }
  },
  header: {
    fontSize: 20,
    fontWeight: 200,
    marginTop: Globals.MARGIN_BASE * 2,
    marginBottom: Globals.MARGIN_BASE * 2
  },
  headerText: {

  },
  textLine: {
    fontWeight: 200,
    fontSize: 14,
    lineHeight: '28px'
  },
  textButton: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0
  },
  centered: {
    textAlign: 'center'
  },
  clickable: {
    cursor: 'pointer'
  },
  linkText: {
    color: Colors.teal
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexCenterColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marginCenter: {
    margin: '0 auto'
  }
}

BaseStyles.textLineCentered = s(BaseStyles.textLine, BaseStyles.centered);

const g = Globals;
const css = BaseStyles;
const rgb = Colors;

export {
  BaseStyles,
  Colors,
  M,
  s,
  g,
  css,
  rgb
};
