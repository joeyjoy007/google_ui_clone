import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React from 'react';
import SubEntryFile from './src/navigations/SubEntryFile';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetContextprovider} from './src/context/BottomSheetContext';
import {LensContextContextprovider, LensContextprovider} from './src/context/LensContext';
import { CroptoolContextprovider } from './src/context/CropToolContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <CroptoolContextprovider>
      <LensContextprovider>
        <BottomSheetContextprovider>
          <SubEntryFile />
        </BottomSheetContextprovider>
      </LensContextprovider>
      </CroptoolContextprovider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
