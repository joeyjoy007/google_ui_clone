import React from 'react'
import { StyleSheet, Text, TouchableOpacity,  View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import { navigationKey } from '../utils/navigation';
import { fontFamily } from '../utils/styles';
import SearchSreen from '../screens/Search';
import Speech from '../screens/Speech';
import Lens from '../screens/Lens';
import { colors } from '../utils/colors';
import { Foundation, MaterialCommunityIcons, MaterialIcons } from '../utils/icons';


const TabNavigation = () => {
    const Tab = createBottomTabNavigator();
    const {tabBarIconContainer,tabBarIcon,tabBarButtonStyle} =styles


  return (
    <View style={{flex:1}}>
      <Tab.Navigator
      screenOptions={({ route }) => {
        const iconMap = {
          [navigationKey.HOME]: { name: 'home', component: Foundation },
          [navigationKey.SEARCH]: { name: 'search', component: MaterialIcons },
          [navigationKey.SPEECH]: { name: 'bookmark-multiple-outline', component: MaterialCommunityIcons },
          [navigationKey.LENS]: { name: 'notifications-none', component: MaterialIcons },
        };
      
        const { name, component: IconComponent } = iconMap[route.name] || { name: 'help-circle', component: MaterialIcons };
      
        return {
          headerShown: false,
          tabBarStyle: { height: 65,paddingTop:10},
          tabBarLabelStyle: { fontSize: 12 }, 
          tabBarActiveTintColor: colors.tabBar.active, 
          tabBarInactiveTintColor:colors.tabBar.inactive,
          tabBarLabel: ({ focused }) => (
            <View style={{marginTop:2}}>
              <Text style={{ 
              color: focused ? colors.tabBar.active:colors.tabBar.inactive, 
              fontFamily:fontFamily.ProductSansMedium,
              fontSize:13

            }}>
              {route.name}
            </Text>
            </View>
          ),
          tabBarHideOnKeyboard: true,
          tabBarButton: (props) => (
            <TouchableOpacity {...props} activeOpacity={1} style={tabBarButtonStyle}>
              {props.children}
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <View style={tabBarIconContainer}>
              <View style={focused?tabBarIcon:{}}>
              <IconComponent 
                name={name} 
                size={size} 
                color={focused ? colors.tabBar.active:colors.tabBar.inactive}
              />
              </View>
            
            </View>
          ),        };
      }}
      
     >
      <Tab.Screen name={navigationKey.HOME}   component={HomeScreen} />
      <Tab.Screen name={navigationKey.SEARCH} options={{animation:'fade'}} component={SearchSreen} />
      <Tab.Screen name={navigationKey.SPEECH}  options={{animation:'fade'}} component={Speech} />
      <Tab.Screen name={navigationKey.LENS}  component={Lens} />

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
    tabBarButtonStyle:{ flex: 1,alignItems:'center',},
    tabBarIconContainer:{width:60,alignItems:'center',height:35,justifyContent:'center'}
})