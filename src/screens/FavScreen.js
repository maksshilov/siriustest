import React, { Fragment } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from '../components/Header'

export default function FavScreen() {
  return (
    <Fragment>
      <Header title="Favorites" />

      <View>
        <Text>FavScreen</Text>
      </View>
    </Fragment>
  )
}
