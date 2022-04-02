import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// components etc
import { colors, windowWidth } from '../styles/variables'

export default function Header({ title, goBack = false, bgColor = '#e5e5e5' }) {
  const navigation = useNavigation()

  return (
    <View style={{ backgroundColor: bgColor }}>
      <LinearGradient colors={[colors.prupleDark, colors.prupleLight]} style={styles.linearGradient}>
        {goBack ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: 'absolute', left: 20, justifyContent: 'center' }}>
            <MaterialCommunityIcons color="#fff" name="arrow-left-thick" size={30} />
          </TouchableOpacity>
        ) : null}
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flexDirection: 'row',
    width: windowWidth,
    height: windowWidth * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerText: {
    fontSize: 22,
    color: '#fff',
  },
})
