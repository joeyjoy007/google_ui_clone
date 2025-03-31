import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {kkrTeam} from '../../../assets/images';
import SheetHeader from './SheetHeader';
import Divider from '../../../components/Divider';
import SheetList from './SheetList';
import {bottomSheetList2} from '../../../utils/appData';
import BoldText from '../../../components/TextInputs/BoldText';

const HomeBottomSheet = () => {
  const {nestedSheetStyle,bottomSheet2} = styles;

  return (
    <>
      <View style={nestedSheetStyle}>
        <SheetHeader />
        <Divider />
        <SheetList />
      </View>

      <View style={bottomSheet2}>
        {bottomSheetList2?.map((e, i: number) => {
          return (
            
              <View
                style={{
                  paddingHorizontal: 25,
                  flexDirection: 'row',
                  gap: 15,
                  top: i == 1 ? 17 : 0,
                }}
                key={i.toString()}>
                <View>{e.icon}</View>
                <BoldText style={{marginTop: 2}} text={e?.name} />
              </View>
            
          );
        })}
      </View>
    </>
  );
};

export default HomeBottomSheet;

const styles = StyleSheet.create({
  nestedSheetStyle: {
    borderRadius: 20,
    backgroundColor: '#fff',
    zIndex: 999999,
    width: '100%',
  },
  bottomSheet2:{width: '100%', top: 10}
});
