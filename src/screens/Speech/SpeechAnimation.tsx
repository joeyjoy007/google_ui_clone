import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from "react-native-reanimated";
import { colors } from "../../utils/colors";

const BAR_COUNT = 4;
const BAR_COLORS = [colors.google.blue,colors.google.red,colors.google.yellow,colors.google.green];

const GoogleSpeechAnimation = () => {
  const bars = Array.from({ length: BAR_COUNT }).map(() => useSharedValue(10));
  const {maincontainer} = styles

  React.useEffect(() => {
    bars.forEach((bar, index) => {
      bar.value = withRepeat(
        withTiming(40 + Math.random() * 20, {
          duration: 500 + index * 100,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    });
  }, []);

  return (
    <View style={maincontainer}>
      {bars.map((height, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          height: height.value,
        }));

        return (
          <Animated.View
            key={index}
            style={[
              {
                width: 8,
                marginHorizontal: 4,
                backgroundColor: BAR_COLORS[index],
                borderRadius: 4,
              },
              animatedStyle,
            ]}
          />
        );
      })}
    </View>
  );
};

export default GoogleSpeechAnimation;

const styles = StyleSheet.create({
  maincontainer:{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: 60 }
});
