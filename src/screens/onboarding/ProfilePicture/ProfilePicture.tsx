import React, { useState } from 'react';
import { StatusBar, Keyboard } from 'react-native';
import {
  MainView,
  ActionButtonContainer,
  SnackbarStyled,
} from './ProfilePicture.styled';
import { ProfileAvatar } from 'src/components';
import { ContainedButton, OutlineButton } from 'src/components/Button';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { OnboardingNavigationScreen } from 'src/navigation/Navigator';
import { MediaContentProp, uploadMedia } from 'src/state/media/mediaAction';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

interface IProps {
  navigation: any;
  uploadMedia: any;
}

const ProfilePicture = ({ navigation, uploadMedia }: IProps) => {
  const [showButtonLoader, setShowButtonLoader] = useState(false);
  const [imageSrc, setImageSrc] = useState({});
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const onSubmit = () => {
    Keyboard.dismiss();
    setShowButtonLoader(true);

    // Create Parameters of Uploading Image
    const mediaParam: MediaContentProp = {
      file_Info: imageSrc,
      entity_type: 'USER',
      entity_id: 1,
      content_type: 'Image',
      content_tag: 'profile_picture',
    };

    uploadMedia(
      mediaParam,
      response => {
        setShowButtonLoader(false);
        console.log('Payload', JSON.stringify(response));
        navigation?.push(OnboardingNavigationScreen.exceptionalCare, {});
      },
      (error: any) => {
        setShowButtonLoader(false);
        console.log('error is', JSON.stringify(error));
        setSnackbarMessage('Something went wrong. Please try again later');
        setShowSnackbar(true);
      },
    );
  };

  // Method for launch Native Image Gallery
  const launchImagePicker = () => {
    let options: ImageLibraryOptions = {
      quality: 0.7,
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log('Response = ', response);
        setImageSrc(response);
      }
    });
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <MainView>
        <ProfileAvatar
          type="image"
          size={160}
          source={{ uri: get(imageSrc, 'uri', '') }}
        />
        <ActionButtonContainer>
          <OutlineButton fullWidth onPress={() => launchImagePicker()}>
            {isEmpty(imageSrc) ? 'Add Picture' : 'Change Picture'}
          </OutlineButton>
          <ContainedButton
            fullWidth
            loading={showButtonLoader}
            disabled={isEmpty(imageSrc)}
            onPress={onSubmit}>
            {'Save'}
          </ContainedButton>
        </ActionButtonContainer>
        <SnackbarStyled
          visible={showSnackbar}
          duration={2000}
          onDismiss={() => setShowSnackbar(false)}>
          {snackbarMessage}
        </SnackbarStyled>
      </MainView>
    </>
  );
};

export default connect(() => ({}), {
  uploadMedia,
})(ProfilePicture);
