import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import Header from './Header';
import {GoogleSvg} from '../../assets/svg';
import SearchBar from './SearchBar';
import QuickFeed from './QuickFeed';
import QuickTodayFeed from './QuickTodayFeed';
import RealFeed from './RealFeed';
import {colors} from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
const HomeScreen = () => {
  const {googleSvgStyle, mainContainer, divider, singlePadding} = styles;

  useFocusEffect(
    useCallback(() => {
      setImmediate(() => {
        StatusBar.setBackgroundColor(colors.lightWhite);
        StatusBar.setTranslucent(true);
      });

      return () => {
        StatusBar.setBackgroundColor(colors.transparent);
        StatusBar.setTranslucent(false);
      };
    }, []),
  );

  return (
    <View style={mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={singlePadding}>
          <Header />
          <View style={googleSvgStyle}>
            <GoogleSvg width={150} />
          </View>
          <SearchBar />
          <QuickFeed />
        </View>
        <View style={divider} />
        <QuickTodayFeed />
        <View style={[singlePadding]}>
          <LinearGradient
            colors={[colors.white, colors.sliverGrey, colors.sliverGrey]}
            style={styles.gradientBackground}
          />
          <RealFeed />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {marginTop: 30, backgroundColor: colors.white},
  singlePadding: {padding: 20},
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginTop: 40,
    height: '100%',
    zIndex: -1,
  },
  googleSvgStyle: {justifyContent: 'center', alignItems: 'center'},
  divider: {
    borderBottomWidth: 1,
    marginTop: 17,
    borderColor: 'grey',
    opacity: 0.2,
  },
});
