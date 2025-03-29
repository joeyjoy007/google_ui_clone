import 'react-native-gesture-handler'
import { StatusBar, StyleSheet, } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './TabNavigation'
import BottomSheetComponent from '../components/BottomSheet.tsx'
import { BottomSheetContext } from '../context/BottomSheetContext.tsx'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../utils/colors.ts'

const SubEntryFile = () => {
  const {bottomSheetRef} = useContext(BottomSheetContext)
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <>
       <StatusBar
       barStyle={'dark-content'}    
       backgroundColor={'#ffffff00'}
       translucent={false}
       />     
      <NavigationContainer>
      <TabNavigation/>
      <BottomSheetComponent handleClose={closeBottomSheet} ref={bottomSheetRef}/>
    </NavigationContainer>
    </>
  )
}

export default SubEntryFile

const styles = StyleSheet.create({})