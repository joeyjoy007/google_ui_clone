import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from './Header';
import {GoogleSvg} from '../../assets/svg';
import SearchBar from './SearchBar';
import QuickFeed from './QuickFeed';

const HomeScreen = () => {
  const {googleSvgStyle, mainContainer} = styles;
  return (
    <View style={mainContainer}>
      <Header />
      <View style={googleSvgStyle}>
        <GoogleSvg width={150} />
      </View>
      <SearchBar />
      <QuickFeed />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {padding: 20},
  googleSvgStyle: {justifyContent: 'center', alignItems: 'center'},
});
