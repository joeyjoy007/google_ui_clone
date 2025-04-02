import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {searchTopBarData} from '../../utils/appData';
import BoldText from '../../components/TextInputs/BoldText';
import NormalText from '../../components/TextInputs/NormalText';
import {colors} from '../../utils/colors';
import {ScrollView} from 'react-native-gesture-handler';

const SearchTopBar = () => {
  const [selected, setSelected] = React.useState(0)
  return (
    <ScrollView horizontal>
      <View style={{flexDirection: 'row', gap: 20, marginLeft: 20}}>
        {searchTopBarData?.map((e, i) => {
          return (
            <Pressable onPress={()=>setSelected(i)} style={{borderBottomWidth: selected==i?1.5:0}} key={i.toString()}>
              <NormalText style={{opacity:selected==i?1:.6}} text={e} />
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SearchTopBar;

const styles = StyleSheet.create({});
