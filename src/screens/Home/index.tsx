import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from './Header';
import {GoogleSvg} from '../../assets/svg';
import SearchBar from './SearchBar';
import QuickFeed from './QuickFeed';
import QuickTodayFeed from './QuickTodayFeed';
import RealFeed from './RealFeed';

const HomeScreen = () => {
  const {googleSvgStyle, mainContainer,divider} = styles;
  return (
    <View style={mainContainer}>
     <ScrollView showsVerticalScrollIndicator={false}>
     <Header />
      <View style={googleSvgStyle}>
        <GoogleSvg width={150} />
      </View>
      <SearchBar />
      <QuickFeed />
      <View style={divider}/>
      <QuickTodayFeed/>
      <RealFeed/>
     </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {padding: 20},
  googleSvgStyle: {justifyContent: 'center', alignItems: 'center'},
  divider:{borderBottomWidth:1,marginTop:17,borderColor:'grey',opacity:.2}
});
