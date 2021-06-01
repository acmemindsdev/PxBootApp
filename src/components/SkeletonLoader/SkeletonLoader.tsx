import React from 'react';
import times from 'lodash/times';
import isNumber from 'lodash/isNumber';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import theme from 'src/theme';

type CustomProp = {
  skeleton?: boolean | number;
  variant?: 'text' | 'rect' | 'round';
};

type SkeletonProp = React.ComponentProps<typeof SkeletonPlaceholder.Item>;

type IProp = CustomProp & SkeletonProp;

const SkeletonLoader = (prop: IProp) => {
  return (
    <SkeletonPlaceholder backgroundColor={theme.colors.gray30}>
      {times(isNumber(prop.skeleton) ? prop.skeleton : 1).map(i => {
        return (
          <SkeletonPlaceholder.Item
            key={i}
            marginBottom={12}
            width={prop.width || '100%'}
            height={prop.height || 40}
            borderRadius={
              prop.variant === 'text' ? 4 : prop.variant === 'round' ? 1000 : 0
            }
            {...prop}
          />
        );
      })}
    </SkeletonPlaceholder>
  );
};

export default SkeletonLoader;
