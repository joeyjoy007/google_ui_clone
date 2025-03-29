import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React from 'react';
import SubEntryFile from './src/navigations/SubEntryFile';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { BottomSheetContextprovider } from './src/context/BottomSheetContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetContextprovider>
        <SubEntryFile />
      </BottomSheetContextprovider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
