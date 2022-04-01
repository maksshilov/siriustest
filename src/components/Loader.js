import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { colors } from '../styles/variables'

export default function Loader() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={colors.prupleLight} size={76} />
    </View>
  )
}
