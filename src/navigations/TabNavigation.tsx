import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import React from 'react'
import HomeScreen from '../screens/Home';
import { navigationKey } from '../utils/navigation';
import { fontFamily } from '../utils/styles';
import SearchSreen from '../screens/Search';
import Speech from '../screens/Speech';


const TabNavigation = () => {
    const Tab = createBottomTabNavigator();


  return (
    <View style={{flex:1}}>
      <Tab.Navigator
      screenOptions={({ route }) => {
        const iconMap = {
          [navigationKey.HOME]: { name: 'home', component: HomeIcon },
          [navigationKey.SEARCH]: { name: 'search', component: MaterialIcons },
          [navigationKey.SPEECH]: { name: 'bookmark-multiple-outline', component: MaterialCommunityIcons },
          [navigationKey.NOTIFICATIONS]: { name: 'notifications-none', component: MaterialIcons },
        };
      
        const { name, component: IconComponent } = iconMap[route.name] || { name: 'help-circle', component: MaterialIcons };
      
        return {
          headerShown: false,
          tabBarStyle: { height: 65 },
          tabBarLabelStyle: { fontSize: 12 }, 
          tabBarActiveTintColor: '#0958CE', 
          tabBarInactiveTintColor: '#5D5D5D',
          tabBarLabel: ({ focused }) => (
            <View style={{marginTop:2}}>
              <Text style={{ 
              color: focused ? '#0958CE' : '#5D5D5D', 
              // fontWeight: focused ? 'bold' : 'normal' ,
              fontFamily:fontFamily.ProductSansMedium,
              fontSize:13

            }}>
              {route.name}
            </Text>
            </View>
          ),
          tabBarHideOnKeyboard: true,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1} style={styles.tabBarButtonStyle}>
              {props.children}
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{width:60,alignItems:'center',height:35,justifyContent:'center'}}>
              <View style={focused?styles.tabBarIcon:{}}>
              <IconComponent 
                name={name} 
                size={size} 
                color={focused ? '#0958CE' : '#5D5D5D'}
              />
              </View>
            
            </View>
          ),        };
      }}
      
     >
      <Tab.Screen name={navigationKey.HOME}   component={HomeScreen} />
      <Tab.Screen name={navigationKey.SEARCH} options={{animation:'shift'}} component={SearchSreen} />
      <Tab.Screen name={navigationKey.SPEECH}  options={{animation:'fade'}} component={Speech} />
      <Tab.Screen name={navigationKey.NOTIFICATIONS}  component={HomeScreen} />

    </Tab.Navigator>
    </View>
  )
}

export default TabNavigation

const styles = StyleSheet.create({
  tabBarIcon:{ backgroundColor: '#E8EDFF',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,},
    tabBarButtonStyle:{ flex: 1,alignItems:'center',justifyContent:'center' }
})