import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/colors';
import GoogleSpeechAnimation from './SpeechAnimation';
import {deviceHeight} from '../../utils/styles';
import BoldText from '../../components/TextInputs/BoldText';
import {startSpeechToText} from 'react-native-voice-to-text';
import LottieView from 'lottie-react-native';
import {navigationKey} from '../../utils/navigation';
import HistoryData from './historyData';
import {MaterialCommunityIcons} from '../../utils/icons';
import { micLottie, waveLottie } from '../../assets/images';

const Speech = () => {
  const defaultText = 'Listening...';
  const [text, setText] = React.useState<string | any>(defaultText);
  const [error, setError] = React.useState<boolean>(false);

  const navigation = useNavigation();
  const {extraHistory, extraHistoryContainer, sectionGap} = styles;

  React.useEffect(() => {
    navigation.setOptions({tabBarStyle: {display: 'none'}});

    return () => {
      navigation.setOptions({tabBarStyle: undefined}); // Restore tabBar when leaving
    };
  }, [navigation]);

  const handleStart = async () => {
    try {
      setError(false);
      setText(defaultText);
      const audioText = await startSpeechToText();
      setText(audioText);
      setTimeout(() => {
        navigation.navigate(navigationKey.SEARCH, {audioText});
      }, 1000);
    } catch (error) {
      setError(true);
      setText('Tap the mic, then speak into your device for quick answers');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setText(defaultText);
      handleStart();
      return () => {
        setError(false);
        setText(defaultText);
      };
    }, []),
  );

  const {mainContainer} = styles;

  return (
    <View style={mainContainer}>
      <View style={[sectionGap, {flex: 0.1, marginTop: 0}]}>
        {error ? (
          <Pressable style={{width: '100%', height: 120}} onPress={handleStart}>
            <LottieView
              source={micLottie}
              autoPlay
              loop
              style={{width: '100%', height: '100%'}}
            />
          </Pressable>
        ) : (
          <GoogleSpeechAnimation />
        )}
      </View>
      <View
        style={[
          sectionGap,
          {flex: 0.2, marginTop: error ? 0 : 66, paddingHorizontal: 20},
        ]}>
        <BoldText
          numberOfLines={error ? 3 : 2}
          style={{fontSize: 22, textAlign: 'center'}}
          text={text}
        />
      </View>
      <View style={[sectionGap, {flex: 0.1, marginTop: 70}]}>
        <LottieView
          source={waveLottie}
          autoPlay
          loop
          style={{width: '100%', height: 120}}
        />
      </View>
      {text == defaultText && (
        <>
          <View style={sectionGap}>
            <HistoryData />
          </View>
          <View style={extraHistoryContainer}>
            <View style={extraHistory}>
              <MaterialCommunityIcons
                size={20}
                color={colors.google.blue}
                name={'music-note'}
              />
              <BoldText text="Search for a song" />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Speech;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: deviceHeight / 8,
  },
  extraHistory: {
    borderWidth: 1.5,
    borderColor: colors.sliverGrey,
    height: 40,
    borderRadius: 20,
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    marginTop: 15,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  extraHistoryContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 100,
    paddingBottom: 30,
  },
  sectionGap: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
});
