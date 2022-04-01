import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
// components etc
import MainNavigator from './src/MainNavigator'
import store from './src/redux'

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App
