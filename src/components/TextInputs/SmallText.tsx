import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { colors } from '../../utils/colors';
import { fontFamily } from '../../utils/styles';

interface SmallTextProps extends TextProps {
  text: string;
}

const SmallText: React.FC<SmallTextProps> = ({ text, style, ...props }) => {
  return (
    <Text style={[styles.smallText, style]} {...props}>
      {text}
    </Text>
  );
};

export default SmallText;

const styles = StyleSheet.create({
  smallText: {
    fontSize: 12, 
    fontFamily:fontFamily.ProductSansLight
  },
});
