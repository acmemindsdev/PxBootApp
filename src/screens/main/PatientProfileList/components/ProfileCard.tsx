import React from 'react';
import theme from 'src/theme';
import { View } from 'react-native';
import { FontWeights, Text1, Text2 } from 'src/components/Typography';
import {
  ProfileRowContainer,
  DetailView,
  CardInnerDivider,
} from '../PatientProfileList.styled';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import get from 'lodash/get';
import { RadioButton } from 'react-native-paper';
import { Divider } from 'src/components';
import { rgba } from 'polished';

type IProp = {
  dataItem: {};
  selected: boolean;
  handleRowClick: any;
};

const ProfileCard = (prop: IProp) => {
  return (
    <ProfileRowContainer
      selected={prop.selected}
      onPress={() => prop.handleRowClick(prop.dataItem)}>
      <View>
        <RadioButton.Android
          value={'1'}
          color={theme.colors.secondary}
          uncheckedColor={rgba(theme.colors.black90, 0.3)}
        />
      </View>

      <DetailView>
        <Text2
          color={theme.colors.black90}
          fontWeight={FontWeights.bold}
          style={{ marginBottom: 5 }}>
          {get(prop.dataItem, 'parameter', 'Felix Harder')}
        </Text2>
        <Text1
          color={rgba(theme.colors.black90, 0.6)}
          fontWeight={FontWeights.bold}>
          {get(prop.dataItem, 'parameter', 'Felix Harder')}
        </Text1>
        <CardInnerDivider />
        <Text1
          color={rgba(theme.colors.black90, 0.6)}
          fontWeight={FontWeights.bold}
          style={{ marginBottom: 8 }}>
          {get(prop.dataItem, 'parameter', 'Felix Harder')}
        </Text1>
        <Text1
          color={rgba(theme.colors.black90, 0.6)}
          fontWeight={FontWeights.bold}>
          {get(prop.dataItem, 'parameter', 'Felix Harder')}
        </Text1>
      </DetailView>
    </ProfileRowContainer>
  );
};

export default ProfileCard;
