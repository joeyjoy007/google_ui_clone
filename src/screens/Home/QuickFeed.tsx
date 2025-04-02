import {ScrollView, StyleSheet, View} from 'react-native';

import React from 'react';
import {colors} from '../../utils/colors';
import {
  EntypoIcons,
  IoniconsIcon,
  MaterialCommunityIcons,
} from '../../utils/icons';

const QuickFeed = () => {
  const {mainContainer, container, iconStyle} = styles;

  const quickFeedItems = [
    {
      color: colors.light.orange,
      icon: (
        <MaterialCommunityIcons
          color={colors.dark.orange}
          size={20}
          name={'image-search-outline'}
        />
      ),
    },
    {
      color: colors.light.blue,
      icon: (
        <IoniconsIcon color={colors.dark.blue} size={20} name={'language'} />
      ),
    },
    {
      color: colors.light.green,
      icon: (
        <EntypoIcons
          size={20}
          color={colors.dark.green}
          name={'graduation-cap'}
        />
      ),
    },
    {
      color: colors.light.red,
      icon: (
        <MaterialCommunityIcons
          size={20}
          color={colors.dark.red}
          name={'music-note'}
        />
      ),
    },
  ];

  return (
    <ScrollView horizontal contentContainerStyle={mainContainer}>
      <View style={container}>
        {quickFeedItems?.map((e: {color: string; icon: any}, i: number) => {
          return (
            <View
              key={i.toString()}
              style={[iconStyle, {backgroundColor: e.color}]}>
              {e?.icon}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default QuickFeed;

const styles = StyleSheet.create({
  mainContainer: {marginTop: 10, flex: 1, justifyContent: 'space-between'},
  container: {flexDirection: 'row', justifyContent:'space-between',width:'100%'},
  iconStyle: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 74,
    borderRadius: 40,
  },
});
