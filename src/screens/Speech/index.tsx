import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/colors';
import GoogleSpeechAnimation from './SpeechAnimation';
import {deviceHeight, deviceWidth} from '../../utils/styles';
import BoldText from '../../components/TextInputs/BoldText';
import {startSpeechToText} from 'react-native-voice-to-text';
import Music from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import {navigationKey} from '../../utils/navigation';
import HistoryData from './historyData';

const Speech = () => {
  const [text, setText] = React.useState<string>('');
  const navigation = useNavigation();
  const {extraHistory,extraHistoryContainer,sectionGap} = styles;

  React.useEffect(() => {
    navigation.setOptions({tabBarStyle: {display: 'none'}});

    return () => {
      navigation.setOptions({tabBarStyle: undefined}); // Restore tabBar when leaving
    };
  }, [navigation]);

  const handleStart = async () => {
    try {
      console.log('j');
      setText('');
      const audioText = await startSpeechToText();
      console.log('audioText:', {audioText});
      // setText(audioText);
      navigation.navigate(navigationKey.SEARCH, {audioText});
    } catch (error) {
      console.log({error});
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     handleStart();
  //   }, [])
  // );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: deviceHeight / 8,
      }}>
      <View style={[sectionGap,{flex:.1,marginTop:0}]}>
        <GoogleSpeechAnimation />
      </View>
      <View
        style={[sectionGap,{flex:.1,marginTop:66}]}>
        <BoldText style={{fontSize: 22}} text="Listening..." />
      </View>
      <View
        style={[sectionGap,{flex:.1,marginTop:70}]}>
        <LottieView
          source={require('../../assets/lottie/lottie.json')}
          autoPlay
          loop
          style={{width: '100%', height: 120}}
        />
      </View>
      <View
        style={sectionGap}>
        <HistoryData />
      </View>
      <View
        style={extraHistoryContainer}>
        <View style={extraHistory}>
          <Music size={20} color={colors.google.blue} name={'music-note'} />
          <BoldText text="Search for a song" />
        </View>
      </View>
    </View>
  );
};

export default Speech;

const styles = StyleSheet.create({
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
  extraHistoryContainer:{
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 100,
  },
  sectionGap:{
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  }
});
