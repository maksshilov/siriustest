import React from 'react'
import {Dimensions, View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const {width: windowWidth, height: windowHeight} = Dimensions.get('window')

export default function Header({title, goBack = false, navigation, bgColor = '#e5e5e5'}) {
  return (
    <View style={{backgroundColor: bgColor}}>
      <LinearGradient colors={['#790598', '#BC1399']} style={styles.linearGradient}>
        {goBack ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{position: 'absolute', left: 20, justifyContent: 'center'}}>
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
