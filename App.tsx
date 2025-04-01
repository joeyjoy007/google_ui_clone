import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React from 'react';
import SubEntryFile from './src/navigations/SubEntryFile';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetContextprovider} from './src/context/BottomSheetContext';
import {LensContextContextprovider} from './src/context/LensContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <LensContextContextprovider>
        <BottomSheetContextprovider>
          <SubEntryFile />
        </BottomSheetContextprovider>
      </LensContextContextprovider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
