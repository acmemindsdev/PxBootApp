import { colors } from './colors';
import { configureFonts, DefaultTheme } from 'react-native-paper';
const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Lato-BoldItalic',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Lato-BoldItalic',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Lato-BoldItalic',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Lato-BoldItalic',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Lato-BoldItalic',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Lato-BoldItalic',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Lato-BoldItalic',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Lato-BoldItalic',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Lato-BoldItalic',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Lato-BoldItalic',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Lato-BoldItalic',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Lato-BoldItalic',
      fontWeight: 'normal',
    },
  },
  default: {
    regular: {
      fontFamily: 'Lato-BoldItalic',
    },
    medium: {
      fontFamily: 'Lato-BoldItalic',
    },
    light: {
      fontFamily: 'Lato-BoldItalic',
    },
    thin: {
      fontFamily: 'Lato-BoldItalic',
    },
  },
};

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    text: 'red',
  },
  fonts: configureFonts(fontConfig),
};

export default {
  colors,
  AppTheme,
};
