import 'react-native-gesture-handler'
import { StyleSheet, } from 'react-native'
import React from 'react'
import TabNavigation from './src/navigations/TabNavigation'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigation/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})