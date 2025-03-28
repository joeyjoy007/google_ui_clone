import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Circle, Line, Rect, G } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

interface CricketBallProps {
  size?: number;
  style?: ViewStyle;
  duration?: number; 
}

const CricketBall: React.FC<CricketBallProps> = ({ size = 100, style, duration = 2000 }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
      <AnimatedSvg width={size} height={size} viewBox="0 0 512 512" style={animatedStyle}>
        {/* Ball */}
        <Circle cx="256" cy="256" r="200" fill="#E53935" />
        {/* Stitching lines */}
        <G>
          <Line x1="293.5" y1="64" x2="293.5" y2="448" stroke="#FFECB3" strokeWidth="5" strokeDasharray="23,12" />
          <Line x1="307.5" y1="64" x2="307.5" y2="448" stroke="#FFECB3" strokeWidth="5" strokeDasharray="23,12" />
          <Line x1="204.5" y1="64" x2="204.5" y2="448" stroke="#FFECB3" strokeWidth="5" strokeDasharray="23,12" />
          <Line x1="218.5" y1="64" x2="218.5" y2="448" stroke="#FFECB3" strokeWidth="5" strokeDasharray="23,12" />
        </G>
        {/* Center seam */}
        <Rect x="241.255" y="49.366" width="29.49" height="413.494" fill="#C62828" />
        {/* Ball Outline */}
        <Circle cx="256" cy="256" r="200" fill="none" stroke="#424242" strokeWidth="10" />
      </AnimatedSvg>
    </View>
  );
};

export default CricketBall;
