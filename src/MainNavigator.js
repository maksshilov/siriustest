import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import MainScreen from './screens/MainScreen'
import FavScreen from './screens/FavScreen'
import PhotoScreen from './screens/PhotoScreen'

const MainStack = createNativeStackNavigator()

export default function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="BottomTabs" component={BottomTabNavigator} />
      <MainStack.Screen name="Elements" component={ElementsNavigator} />
    </MainStack.Navigator>
  )
}

const BottomTab = createMaterialBottomTabNavigator()
const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      activeColor="#A10D99"
      inactiveColor="#94949D"
      barStyle={{ backgroundColor: '#fff' }}>
      <BottomTab.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarLabel: 'Gallery',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="table-large" color={color} size={20} />,
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="star" color={color} size={20} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

const ElementsStack = createNativeStackNavigator()
const ElementsNavigator = () => {
  return (
    <ElementsStack.Navigator>
      <ElementsStack.Screen name="Photo" component={PhotoScreen} options={{ headerShown: false }} />
    </ElementsStack.Navigator>
  )
}
