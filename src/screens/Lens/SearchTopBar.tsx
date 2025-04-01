import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {searchTopBarData} from '../../utils/appData';
import BoldText from '../../components/TextInputs/BoldText';
import NormalText from '../../components/TextInputs/NormalText';
import {colors} from '../../utils/colors';
import {ScrollView} from 'react-native-gesture-handler';

const SearchTopBar = () => {
  return (
    <ScrollView horizontal>
      <View style={{flexDirection: 'row', gap: 20, marginLeft: 20}}>
        {searchTopBarData?.map((e, i) => {
          return (
            <View style={{borderBottomWidth: 1.5}} key={i.toString()}>
              <NormalText text={e} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SearchTopBar;

const styles = StyleSheet.create({});
