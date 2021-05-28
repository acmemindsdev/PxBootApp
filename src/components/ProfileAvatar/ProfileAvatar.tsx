import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { IconStyled, ImageStyled, ContainerView } from './ProfileAvatar.styled';

type ProfileAvatarProp = {
  editMode?: boolean;
  type: 'image' | 'icon' | 'text';
  size: number;
  source: any;
};

export type CustomAvatarProp = ProfileAvatarProp;

const ProfileAvatar = (prop: ProfileAvatarProp) => {
  return (
    <ContainerView>
      {prop.type === 'image' && (
        <>
          <ImageStyled
            style={{
              width: prop.size,
              height: prop.size,
              borderRadius: prop.size,
            }}
            resizeMode="cover"
            source={!isEmpty(prop.source.uri) ? prop.source : null}
          />
          {isEmpty(prop.source.uri) && (
            <IconStyled size={prop.size / 2.5} name="md-person-outline" />
          )}
        </>
      )}
    </ContainerView>
  );
};

export default ProfileAvatar;
