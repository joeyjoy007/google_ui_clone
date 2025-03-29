import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { GoogleSvg } from '../../assets/svg';
import HomeBottomSheet from '../../screens/Home/HomeBottomSheet';


interface BottomSheetProps {
    handleSheetChanges?: (index: number) => void;
  }

const BottomSheetComponent =forwardRef<BottomSheet, BottomSheetProps>(
    ({ handleSheetChanges }, ref) => {

        const {bottomSheerViewStyle,bottomSheetStyle,handleStyle,closeIcon} = styles

        const renderBackdrop = (props: any) => (
            <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} style={{ backgroundColor: 'rgba(0,0,0,.5)' }} />
          );

          const handleClose = () => {
            if (ref && typeof ref !== 'function' && ref.current) {
                ref.current.collapse();
            }
        };

          const renderHandle = () => (
            <View style={{paddingHorizontal:50,}}>
              <View  style={handleStyle}>
                <Pressable onPress={handleClose}>
                  <Text style={closeIcon}>✕</Text>
                </Pressable>
                <GoogleSvg width={80} height={50}/>
               <View></View>
              </View>
            </View>
          );
      
  return (
     <BottomSheet  handleComponent={renderHandle} backgroundStyle={bottomSheetStyle} backdropComponent={renderBackdrop} enablePanDownToClose={true}   ref={ref}  index={-1} onChange={handleSheetChanges} snapPoints={['90%']}>
     <BottomSheetView   style={bottomSheerViewStyle}>
          <HomeBottomSheet/>
        </BottomSheetView>
    </BottomSheet>
  );
});

export default BottomSheetComponent;

const styles = StyleSheet.create({
  sheetContent: { flex: 1,paddingHorizontal:20, alignItems: 'center', justifyContent: 'center' },
  bottomSheerViewStyle:{marginRight:30,height:'100%',flex:1,marginTop:5,marginLeft:30,display:'flex',alignItems:'center',justifyContent:'flex-start'},
  bottomSheetStyle:{backgroundColor:'#f2f5fc',marginLeft:20,marginRight:20,borderRadius:25},
  handleStyle:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  closeIcon:{left:-10,fontSize:17,fontWeight:'700',padding:5,zIndex:99999999}

});
