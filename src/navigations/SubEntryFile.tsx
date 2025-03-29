import 'react-native-gesture-handler'
import { StyleSheet, } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './TabNavigation'
import BottomSheetComponent from '../components/BottomSheet.tsx'
import { BottomSheetContext } from '../context/BottomSheetContext.tsx'

const SubEntryFile = () => {
  const {bottomSheetRef} = useContext(BottomSheetContext)
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  return (
      <NavigationContainer>
      <TabNavigation/>
      <BottomSheetComponent handleClose={closeBottomSheet} ref={bottomSheetRef}/>
    </NavigationContainer>
  )
}

export default SubEntryFile

const styles = StyleSheet.create({})