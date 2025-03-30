import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FocusCorners = () => {
    const {focusBox,cornerTopLeft,globalCornerCss,cornerTopRight,cornerBottomLeft,cornerBottomRight} = styles
  return (
       <View style={focusBox}>
            <View style={[globalCornerCss,cornerTopLeft]} />
            <View style={[globalCornerCss,cornerTopRight]} />
            <View style={[globalCornerCss,cornerBottomLeft]} />
            <View style={[globalCornerCss,cornerBottomRight]} />
          </View>
  )
}

export default FocusCorners

const styles = StyleSheet.create({
    focusBox: {
        position: "absolute",
        width: 250,
        height: 250,
        alignSelf: "center",
        top: "35%",
      },
    globalCornerCss:{
        position: "absolute",
        width: 50,
        height: 50,
        borderColor: "white",
    },
      cornerTopLeft: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        top: 0,
        borderTopLeftRadius:30,
        left: 0,
      },
      cornerTopRight: {
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderTopRightRadius:30,
        top: 0,
        right: 0,
      },
      cornerBottomLeft: {
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderBottomLeftRadius:30,
        bottom: 0,
        left: 0,
      },
      cornerBottomRight: {
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomRightRadius:30,
        bottom: 0,
        right: 0,
      },
})