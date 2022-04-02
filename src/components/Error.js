import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { colors } from '../styles/variables'

export default function Error({ type }) {
  const dispatch = useDispatch()

  function handleRetry() {
    dispatch({ type })
  }

  return (
    <View style={styles.center}>
      <Text>Error!</Text>
      <TouchableOpacity style={styles.btn} onPress={handleRetry}>
        <Text style={styles.btnText}>Try again!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.prupleDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
})
