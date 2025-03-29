import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { searchList } from '../../utils/appData';
import NormalText from '../../components/TextInputs/NormalText';
import { colors } from '../../utils/colors';

const SearchList = () => {
  const renderSearchList = ({ item, index }:{item:string,index:number}) => (
    <View key={index.toString()} style={[styles.itemContainer,{marginTop:index==0?10:18}]}>
      <View style={styles.iconContainer}>
        <FeatherIcon size={17} name="clock" />
      </View>
      <NormalText text={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[...searchList,...searchList]}
        renderItem={renderSearchList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  listContainer: {
    paddingBottom: 20, 
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.sliverGrey,
    opacity: 0.5,
    borderRadius: 100,
    height: 30,
    width: 30,
  },
});
