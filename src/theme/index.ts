import { colors } from './colors';
import sizes from './sizes';
import { configureFonts, DefaultTheme } from 'react-native-paper';
const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'Lato-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Lato-Regular',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Lato-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Lato-Regular',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Lato-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Lato-Regular',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Lato-Regular',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Lato-Regular',
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
  sizes,
};
