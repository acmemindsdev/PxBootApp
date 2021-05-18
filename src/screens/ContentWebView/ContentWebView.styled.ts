import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';
import theme from 'src/theme';

export const MainView = styled.View`
  flex: 1;
  background-color: ${theme.colors.white};
`;

export const WebViewStyledStyled = styled(WebView)`
  flex: 1;
`;

export const IndicatorView = styled.View`
  top: 0;
  bottom: 0;
  position: absolute;
  align-self: center;
  align-items: center;
  justify-content: center;
`;
