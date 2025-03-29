import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { colors } from '../../utils/colors';
import { fontFamily } from '../../utils/styles';

interface NormalTextProps extends TextProps {
  text: string;
}

const NormalText: React.FC<NormalTextProps> = ({ text, style, ...props }) => {
  return (
    <Text style={[styles.normalText, style]} {...props}>
      {text}
    </Text>
  );
};

export default NormalText;

const styles = StyleSheet.create({
  normalText: {
    fontSize: 15, 
    fontFamily:fontFamily.ProductSansMedium,
    opacity:.7
  },
});
