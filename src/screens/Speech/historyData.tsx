import React from 'react';
import {StyleSheet, View} from 'react-native';
import BoldText from '../../components/TextInputs/BoldText';
import {colors} from '../../utils/colors';
import {searchList} from '../../utils/appData';
import {FeatherIcon} from '../../utils/icons';

const HistoryData = () => {
  const {historyDataContainer, maincontainer} = styles;
  return (
    <View style={maincontainer}>
      {searchList?.slice(0, 4).map((e, i) => {
        return (
          <View key={i.toString()} style={historyDataContainer}>
            {i < 2 ? (
              <FeatherIcon color={colors.google.blue} size={17} name="clock" />
            ) : (
              <FeatherIcon
                color={colors.google.blue}
                size={17}
                name="trending-up"
              />
            )}
            <BoldText text={e} />
          </View>
        );
      })}
    </View>
  );
};

export default HistoryData;

const styles = StyleSheet.create({
  historyDataContainer: {
    borderWidth: 1.5,
    borderColor: colors.sliverGrey,
    height: 40,
    borderRadius: 20,
    width: '100%',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  maincontainer: {width: '100%', paddingHorizontal: 10, gap: 15},
});
