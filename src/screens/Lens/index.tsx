import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import GoogleLensUI from './LensUi';

const Lens = () => {

    const navigation = useNavigation();
      const {} = styles;
    
      React.useEffect(() => {
        navigation.setOptions({tabBarStyle: {display: 'none'}});
    
        return () => {
          navigation.setOptions({tabBarStyle: undefined}); // Restore tabBar when leaving
        };
      }, [navigation]);
  return (
    <View style={{flex:1}}>
      <GoogleLensUI/>
    </View>
  )
}

export default Lens

const styles = StyleSheet.create({})