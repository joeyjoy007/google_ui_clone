import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {kkrTeam, myProfile} from '../../../assets/images';
import BoldText from '../../../components/TextInputs/BoldText';
import SmallText from '../../../components/TextInputs/SmallText';
import { colors } from '../../../utils/colors';
import { fontFamily } from '../../../utils/styles';
import { IoniconsIcon } from '../../../utils/icons';



const SheetHeader = () => {
    const {googleAccountButton,headerContainer,container,maincontainer} = styles

    
  return (
    <View style={maincontainer}>
      <View style={headerContainer}>
        <View style={container}>
          <Image
            source={myProfile}
            style={{width: 45, height: 45, borderRadius: 22.5}}
          />

          <View>
            <BoldText text='Garvit Jain'/>
            <SmallText text='garvitxyz000@gmail.com'/>
          </View>
        </View>

        <View>
          <IoniconsIcon name='caret-down-circle-outline' style={{fontFamily:fontFamily.ProductSansMedium}} size={25}/>
        </View>
      </View>

      <TouchableOpacity
        style={googleAccountButton}>
        <BoldText text='Google Account'/>
      </TouchableOpacity>
    </View>
  );
};

export default SheetHeader;

const styles = StyleSheet.create({
  maincontainer:{padding:15},
    googleAccountButton:{
        borderWidth: 1,
        borderColor:colors.lightGrey,
        marginLeft: 55,
        top: 20,
        borderRadius: 8,
        padding: 5,
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
      },
      container:{flexDirection: 'row', alignItems: 'flex-start', gap: 10},
      headerContainer:{flexDirection: 'row', justifyContent: 'space-between'}
});
