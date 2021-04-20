import { colors } from './colors';
import { configureFonts, DefaultTheme } from 'react-native-paper';
const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'Lato-Regular',
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
};

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    text: colors.black90,
    background: colors.white,
  },
  fonts: configureFonts(fontConfig),
};

export default {
  colors,
  AppTheme,
};
