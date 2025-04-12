import {
  Alert,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {GoogleLensSvg, GoogleMicSvg} from '../../assets/svg';
import {colors} from '../../utils/colors';
import SearchList from './SearchList';
import {useNavigation} from '@react-navigation/native';
import {navigationKey} from '../../utils/navigation';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';
import {MaterialIcons} from '../../utils/icons';

import {RouteProp} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SearchScreenRouteProp = RouteProp<{params: {audioText?: string}}, 'params'>;

const SearchScreen = ({route}: {route: SearchScreenRouteProp}) => {
  const {mainContainer, searchIcon, googleAsset, textInputstyle, parentView} =
    styles;

  const navigation: any = useNavigation();

  const {audioText} = route?.params || {};
  const valueText = audioText;

  React.useEffect(() => {
    navigation.setOptions({tabBarStyle: {display: 'none'}});

    return () => {
      navigation.setOptions({tabBarStyle: undefined});
    };
  }, [navigation]);

  const navigateToHome = () => {
    navigation.navigate(navigationKey.HOME);
  };

  const requestMicrophonePermission = async () => {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.MICROPHONE,
      android: PERMISSIONS.ANDROID.RECORD_AUDIO,
    });

    if (!permission) return;

    const currentStatus = await check(permission);

    if (currentStatus === RESULTS.BLOCKED || currentStatus === RESULTS.DENIED) {
      Alert.alert(
        'Permission Required',
        'Microphone access is blocked. Please enable it in settings.',
        [{text: 'Open Settings', onPress: () => Linking.openSettings()}],
      );
      return;
    }

    const result = await request(permission);

    if (result === RESULTS.GRANTED) {
      navigation.navigate(navigationKey.SPEECH);
    }
  };

  const requestLensAccess = async () => {
    navigation.navigate(navigationKey.LENS);
  };
  return (
 <SafeAreaView style={{flex:1}}>
     <View style={parentView}>
      <View style={mainContainer}>
        <Pressable style={searchIcon} onPress={navigateToHome}>
          <MaterialIcons name="arrow-back" size={25} />
        </Pressable>
        <TextInput
          placeholder="Search..."
          placeholderTextColor={colors.grey}
          value={valueText}
          style={textInputstyle}
        />
        <View
          style={{borderBottomWidth: 1, borderColor: colors.lightGrey, top: 0}}
        />
        <View style={googleAsset}>
          <Pressable onPress={requestMicrophonePermission}>
            <GoogleMicSvg width={30} height={30} />
          </Pressable>
          <Pressable onPress={requestLensAccess}>
            <GoogleLensSvg width={22} height={22} />
          </Pressable>
        </View>
      </View>
      <SearchList />
    </View>
 </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  parentView: {
    paddingHorizontal: 10,
    paddingTop: 0,
    backgroundColor: '#fff',
    flex: 1,
  },
  mainContainer: {
    height: 40,
    borderRadius: 100,
    marginTop: 10,
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 9999999999,
    left: 10,
    color: colors.black,
  },
  googleAsset: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 15,
    gap: 20,
  },
  textInputstyle: {
    fontSize: 17,
    paddingHorizontal: 53,
    paddingRight: 90,
    height: 45,
    borderColor: colors.grey,
  },
});
