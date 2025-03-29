import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { fontFamily } from '../../utils/styles';

interface BoldTextProps extends TextProps {
  text: string;
}

const BoldText: React.FC<BoldTextProps> = ({ text, style, ...props }) => {
  return (
    <Text style={[styles.boldText, style]} {...props}>
      {text}
    </Text>
  );
};

export default BoldText;

const styles = StyleSheet.create({
  boldText: {
    fontSize: 14, 
    fontFamily:fontFamily.ProductSansMedium
  },
});
