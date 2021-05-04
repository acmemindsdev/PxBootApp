import styled from 'styled-components/native';
import OtpInputs from 'react-native-otp-inputs';
import { StyleSheet } from 'react-native';
import theme from 'src/theme';
import { rgba } from 'polished';
import { FontWeights } from 'src/components/Typography';

export const MainView = styled.View``;

export const ActionButtonContainer = styled.View`
  margin: 20px 0px;
`;

export const OTPInputsContainer = styled.View`
  height: 180px;
  background-color: ${rgba(theme.colors.otpGreen, 0.1)};
  border-radius: 4px;
  padding: 42px 32px;
`;

export const OtpInputsStyled = styled(OtpInputs)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

export const styles = StyleSheet.create({
  inputContainerStyles: {
    width: '20%',
    height: 60,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyles: {
    // color: theme.colors.white,
    backgroundColor: theme.colors.white,
    flex: 1,
    width: '100%',
    textAlign: 'center',
    fontFamily: theme.AppTheme.fonts.regular.fontFamily,
    fontSize: 24,
    fontWeight: `${FontWeights.bold}`,
    borderWidth: 1,
    borderColor: theme.colors.gray40,
    borderRadius: 6,
  },
  filled: {
    backgroundColor: theme.colors.otpGreen,
    color: theme.colors.white,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  blank: {
    backgroundColor: theme.colors.white,
  },
});
