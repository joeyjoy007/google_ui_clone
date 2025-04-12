import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {mockSearchData} from '../../../utils/appData';
import {deviceWidth} from '../../../utils/styles';
import {colors} from '../../../utils/colors';
import NormalText from '../../../components/TextInputs/NormalText';
import BoldText from '../../../components/TextInputs/BoldText';

const SearchScreen = ({
  scrollEnabled,
  searchListAnimation,
}: {
  scrollEnabled: boolean;
  searchListAnimation: any;
}) => {
  interface IITems {
    snippet: string;
    image_url: string;
    source_icon: React.ReactElement;
    source: string;
  }
  const heights = [160, 170, 150, 180, 150];

  const {
    flatlistContentStyle,
    searchContainer,
    imageStyle,
    textView,
    sourceIconStyle,
  } = styles;

  const renderSearchItem = ({item, index}: {item: IITems; index: number}) => {
    const {snippet, image_url, source_icon, source} = item;
    const itemHeight = heights[index % heights.length];
    return (
      <View style={{padding: 5}}>
        <View style={[searchContainer, {height: itemHeight}]}>
          <Image source={{uri: image_url}} style={imageStyle} />
        </View>
        <View style={{gap: 5}}>
          <View style={textView}>
            <Image source={source_icon} style={sourceIconStyle} />
            <NormalText text={source} />
          </View>
          <View>
            <BoldText
              style={{width: deviceWidth / 2.2}}
              numberOfLines={2}
              text={snippet}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={[
          ...mockSearchData[0]?.search_results,
          ...mockSearchData[0]?.search_results,
          ...mockSearchData[0]?.search_results,
        ]}
        keyExtractor={(e, i) => i.toString()}
        scrollEnabled={scrollEnabled}
        renderItem={renderSearchItem}
        onScroll={searchListAnimation}
        contentContainerStyle={flatlistContentStyle}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchContainer: {
    width: deviceWidth / 2.2,
    borderColor: colors.grey,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  sourceIconStyle: {width: 20, height: 20, resizeMode: 'contain'},
  imageStyle: {width: '100%', height: '100%', resizeMode: 'cover'},
  flatlistContentStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal:2
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 5,
  },
});
