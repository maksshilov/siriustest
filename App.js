import React, {Fragment} from 'react'
import {StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import MainNavigator from './src/MainNavigator'

const App = () => {
  return (
    <Fragment>
      <StatusBar />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Fragment>
  )
}

export default App
