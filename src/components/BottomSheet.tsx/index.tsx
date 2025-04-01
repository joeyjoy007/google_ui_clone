import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import { GoogleSvg } from '../../assets/svg';
import HomeBottomSheet from '../../screens/Home/HomeBottomSheet';
import { colors } from '../../utils/colors';


interface BottomSheetProps {
    handleSheetChanges?: (index: number) => void;
  }

const BottomSheetComponent =forwardRef<BottomSheet, BottomSheetProps>(
    ({ handleSheetChanges }, ref) => {

        const {bottomSheerViewStyle,bottomSheetStyle,handleStyle,closeIcon} = styles

        const renderBackdrop = (props: any) => (
            <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} style={{ backgroundColor: colors.lightBlack}} />
          );

          const handleClose = () => {
            if (ref && typeof ref !== 'function' && ref.current) {
                ref.current.close();
            }
        };

          const renderHandle = () => (
            <View style={{paddingHorizontal:50,}}>
              <View  style={handleStyle}>
                <TouchableOpacity style={{left:-10}} onPress={handleClose}>
                  <Text style={closeIcon}>✕</Text>
                </TouchableOpacity>
                <GoogleSvg width={80} height={50}/>
               <View></View>
              </View>
            </View>
          );
      
  return (
     <BottomSheet  handleComponent={renderHandle} backgroundStyle={bottomSheetStyle} backdropComponent={renderBackdrop} enablePanDownToClose={true}   ref={ref}  index={-1} onChange={handleSheetChanges} snapPoints={['90%']}>
     <BottomSheetScrollView  contentContainerStyle={bottomSheerViewStyle}>
          <HomeBottomSheet/>
        </BottomSheetScrollView>
    </BottomSheet>
  );
});

export default BottomSheetComponent;

const styles = StyleSheet.create({
  sheetContent: { flex: 1,paddingHorizontal:20, alignItems: 'center', justifyContent: 'center' },
  bottomSheerViewStyle:{marginRight:30,flex:1,marginTop:5,marginLeft:30,display:'flex',alignItems:'center',justifyContent:'flex-start'},
  bottomSheetStyle:{backgroundColor:'#f2f5fc',marginLeft:20,marginRight:20,borderRadius:25},
  handleStyle:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  closeIcon:{fontSize:17,fontWeight:'700',padding:5,zIndex:99999999}

});
