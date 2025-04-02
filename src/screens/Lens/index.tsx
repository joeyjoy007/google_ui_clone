import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import GoogleLensUI from './LensUi';

const Lens = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({tabBarStyle: {display: 'none'}});

    return () => {
      navigation.setOptions({tabBarStyle: undefined}); 
    };
  }, [navigation]);
  return (
    <View style={{flex: 1}}>
      <GoogleLensUI />
    </View>
  );
};

export default Lens;

const styles = StyleSheet.create({});
