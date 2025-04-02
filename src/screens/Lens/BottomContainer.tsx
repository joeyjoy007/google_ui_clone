import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {lensBottomData} from '../../utils/appData';
import {fontFamily} from '../../utils/styles';
import {colors} from '../../utils/colors';
import {GoogleLogo, GoogleMicSvg} from '../../assets/svg';
import Divider from '../../components/Divider';
import SearchScreen from './searchScreen/SearchScreen';
import SearchTopBar from './SearchTopBar';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const BottomContainer = ({
  capturedImage,
  scrollEnabled,
  setScrolledEnabled,
  searchListAnimation,
  opacity,
  scale,
  topBar
}: {
  capturedImage: string;
  scrollEnabled: boolean;
  setScrolledEnabled: any;
  searchListAnimation: any;
  opacity:{value:number}
  scale:{value:number}
  topBar:{value:number}
}) => {
  const [buttonState, setButtonState] = React.useState(1);
  const {childContainer, bottomContainer, actionButton, buttonText} = styles;



  const opacityStyle = useAnimatedStyle(()=>({
      opacity:withTiming(opacity.value),
      height:interpolate(opacity.value, [0, 1], [0, 50], Extrapolation.CLAMP),
      transform:[{scale:scale.value}],
  }))

  const getTopBar = useAnimatedStyle(()=>({
      opacity:withTiming(topBar.value),
      height:interpolate(topBar.value, [0, 1], [0, 23], Extrapolation.CLAMP),
      transform:[{scale:topBar.value}],

  }))
  return (
    <>
      <View style={{width: '100%', flex: 1, marginTop: capturedImage ? 0 : 10}}>
        {capturedImage && (
          <Animated.View
            style={[{
              height: 50,
              flexDirection: 'row',
              borderRadius: 25,
              backgroundColor: colors.searchBarColor,
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            },opacityStyle]}>
            <View style={{flexDirection: 'row'}}>
              <GoogleLogo />
              <TextInput
                placeholder="Add to your search"
                style={{
                  fontFamily: fontFamily.ProductSansMedium,
                  marginLeft: 5,
                }}
                placeholderTextColor={colors.black}
              />
            </View>
            <GoogleMicSvg />
          </Animated.View>
        )}
        <Animated.View style={[bottomContainer, opacityStyle]}>
          <View style={[childContainer]}>
            {lensBottomData?.map((e, i) => {
              return (
                <Pressable
                  onPress={() => setButtonState(i)}
                  key={i.toString()}
                  style={[
                    actionButton,
                    {
                      backgroundColor:
                        buttonState == i ? colors.light.blue : '#ffffff00',
                      borderColor:
                        buttonState == i ? colors.light.blue : colors.lightGrey,
                    },
                  ]}>
                  {e.icon}
                  <Text
                    style={[
                      buttonText,
                      {
                        color:
                          buttonState == i ? colors.google.blue : colors.black,
                        opacity: buttonState == i ? 1 : 0.7,
                      },
                    ]}>
                    {e.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>

        <Animated.View style={[getTopBar,{marginTop:5}]}>
          <SearchTopBar />
        </Animated.View>
        <Divider top={20} />
        <View style={{marginTop: 10}}>
          <SearchScreen
            scrollEnabled={scrollEnabled}
            setScrolledEnabled={setScrolledEnabled}
            searchListAnimation={searchListAnimation}
          />
        </View>
      </View>
    </>
  );
};

export default BottomContainer;

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    width: '100%',
    // flex: 1,
  },
  childContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',

    gap: 5,
  },

  buttonText: {
    fontSize: 14,
    opacity: 0.7,
    fontFamily: fontFamily.ProductSansMedium,
  },
  searchIcon: {fontSize: 24, fontWeight: 'bold'},
});
