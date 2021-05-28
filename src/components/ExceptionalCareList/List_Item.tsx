import React from 'react';
import theme from 'src/theme';
import { FontWeights, Text2 } from '../Typography';
import { RowContainer } from './ExceptionalCareList.styled';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import get from 'lodash/get';

type IProp = {
  dataItem: {};
  selected: boolean;
  handleRowClick: any;
};

const ListItem = (prop: IProp) => {
  return (
    <RowContainer
      selected={prop.selected}
      onPress={() => prop.handleRowClick(prop.dataItem)}>
      <Text2
        color={prop.selected ? theme.colors.white : undefined}
        fontWeight={prop.selected ? FontWeights.semiBold : FontWeights.medium}>
        {get(prop.dataItem, 'parameter')}
      </Text2>
      {prop.selected && (
        <Icon size={18} color={theme.colors.white} name={'check-bold'} />
      )}
    </RowContainer>
  );
};

export default ListItem;
