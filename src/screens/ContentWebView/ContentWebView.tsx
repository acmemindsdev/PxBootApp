import React, { useState, useEffect } from 'react';
import {
  MainView,
  WebViewStyledStyled,
  IndicatorView,
} from './ContentWebView.styled';
import { StatusBar, ActivityIndicator } from 'react-native';
import theme from 'src/theme';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const VerificationSuccess = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadURL, setLoadURL] = useState('');

  type RouteParams = {
    params: {
      screenMode: string;
    };
  };

  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const { screenMode } = route.params;

  useEffect(() => {
    let title = '';
    if (screenMode === 'PRIVACY_POLICY') {
      title = 'Privacy Policy';
      setLoadURL('https://opensource.facebook.com/legal/privacy');
    }
    if (screenMode === 'TERMS_CONDITIONS') {
      title = 'Terms & Conditions';
      setLoadURL('https://opensource.facebook.com/legal/terms');
    }
    navigation.setOptions({ headerTitle: title });
  }, [screenMode]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <MainView>
        <WebViewStyledStyled
          source={{ uri: loadURL }}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
          <IndicatorView>
            <ActivityIndicator
              testID="loadingIndicator"
              size="large"
              color={theme.colors.secondary}
            />
          </IndicatorView>
        )}
      </MainView>
    </>
  );
};

export default VerificationSuccess;
