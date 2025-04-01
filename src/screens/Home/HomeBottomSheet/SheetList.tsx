import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {bottomSheetList} from '../../../utils/appData';
import BoldText from '../../../components/TextInputs/BoldText';
import Divider from '../../../components/Divider';

const SheetList = () => {
  const {sheetItem,dividersPadding} = styles;
  return (
    <ScrollView
      style={{overflow: 'hidden'}}
      showsVerticalScrollIndicator={false}>
      {bottomSheetList?.map((e, i: number) => {
        return (
          <View key={i.toString()}>
            <View
              style={sheetItem}>
              <View style={{marginTop: e.halfDivider ? 0 : 7}}>{e.icon}</View>
              <BoldText
                style={{
                  marginLeft: e.divider ? 37 : 0,
                  marginTop: e.halfDivider ? 0 : 7,
                }}
                text={e?.name}
              />
            </View>
            <View style={dividersPadding}>
              {e?.halfDivider && <Divider top={8} />}
            </View>
            {e?.divider && <Divider top={6} />}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default SheetList;

const styles = StyleSheet.create({
  sheetItem:{
    padding: 9,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  dividersPadding:{paddingLeft: 70}
});
