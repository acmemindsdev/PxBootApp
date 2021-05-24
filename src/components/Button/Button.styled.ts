import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import theme from 'src/theme';
import { CustomButtonPaper } from './Button';
import { StyledProps } from 'styled-components';
import { rgba } from 'polished';

const btnStyles = (props: CustomButtonPaper) => {
  const { colors, sizes } = theme;
  const btnSizeName = props.fullWidth
    ? 'xl'
    : props.large
    ? 'lg'
    : props.small
    ? 'sm'
    : props.md
    ? 'md'
    : null;
  const styles: StyledProps<any> = {
    width: btnSizeName ? sizes.buttons[btnSizeName].width : 'auto',
    alignSelf: props.align === 'right' ? 'flex-end' : 'flex-start',
    marginBottom: '12px',
    borderRadius: '5px',
  };

  if (props.disabled) {
    styles.background = rgba(colors.black90, 0.08);
  }

  if (props.mode === 'outlined') {
    styles.background = colors.white;
    styles.borderColor = colors.primary;
    styles.borderWidth = '1px';
  }

  return styles;
};

export const ButtonStyled = styled(Button).attrs((props: CustomButtonPaper) => {
  const { sizes } = theme;
  let labelStyle = {
    fontSize: 16,
    fontWeight: '700',
    color:
      props.mode === 'outlined' ? theme.colors.primary : theme.colors.white,
    textAlign: 'center',
    letterSpacing: 0,
  };

  if (props.labelStyle) {
    labelStyle = {
      ...labelStyle,
      ...(<Object>props.labelStyle),
    };
  }
  const btnSizeName = props.fullWidth
    ? 'xl'
    : props.large
    ? 'lg'
    : props.small
    ? 'sm'
    : props.md
    ? 'md'
    : null;

  const contentStyle: StyledProps<any> = {
    width: btnSizeName ? sizes.buttons[btnSizeName].width : 'auto',
    height: btnSizeName ? sizes.buttons[btnSizeName].height : 'auto',
    flexDirection: 'row-reverse',
  };

  return {
    contentStyle,
    labelStyle,
    uppercase: props.uppercase || false,
  };
})<CustomButtonPaper>(btnStyles);

export const TextButtonStyled = styled(ButtonStyled).attrs({
  labelStyle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
    color: theme.colors.primary,
    letterSpacing: 0,
  },
})`
  background-color: transparent;
  opacity: 1;
`;
