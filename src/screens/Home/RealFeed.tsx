import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BoldText from '../../components/TextInputs/BoldText';
import SmallText from '../../components/TextInputs/SmallText';
import {fontFamily} from '../../utils/styles';

import {realFeedData} from '../../utils/appData';
import {colors} from '../../utils/colors';
import {MaterialCommunityIcons} from '../../utils/icons';

const RealFeed = () => {
  const {
    mainImageBox,
    mainImageview,
    imageStyle,
    viewTextStyle,
    headingTextStyle,
    sourceContainerstyle,
    sourceSubcontainer,
    sourceIcon,
    sourceImage,
    sourceText,
  } = styles;
  return (
    <View>
      {realFeedData?.map((e, i) => {
        return (
          <View key={i.toString()} style={mainImageBox}>
            <View style={mainImageview}>
              <Image source={e.image} style={imageStyle} />
            </View>
            <View style={viewTextStyle}>
              <View>
                <BoldText
                  style={headingTextStyle}
                  numberOfLines={3}
                  text={`${e.desc}`}
                />
              </View>

              <View style={sourceContainerstyle}>
                <View style={sourceSubcontainer}>
                  <View style={sourceIcon}>
                    <Image source={e.sourceImg} style={sourceImage} />
                  </View>
                  <SmallText style={sourceText} text={e.source} />
                </View>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={20}
                  color={colors.grey}
                />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default RealFeed;

const styles = StyleSheet.create({
  mainImageBox: {
    backgroundColor: 'white',
    marginTop: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  mainImageview: {height: 230, borderRadius: 20},
  imageStyle: {height: '100%', aspectRatio: 4 / 2},
  viewTextStyle: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 130,
  },
  headingTextStyle: {fontSize: 20, lineHeight: 25, opacity: 0.8},
  sourceContainerstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceSubcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  sourceImage: {height: '100%', resizeMode: 'contain'},
  sourceIcon: {
    borderRadius: 100,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sourceText: {fontFamily: fontFamily.ProductSansLight},
});
