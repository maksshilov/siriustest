import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { createClient } from 'pexels'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from '../components/Header'
import { windowWidth } from '../styles/variables'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'

export default function PhotoScreen({ navigation }) {
  const { loading } = useSelector(state => state)
  const { id, uri } = useSelector(state => state.photo)

  return (
    <>
      <Header title={`Photo ID: ${id}`} goBack navigation={navigation} bgColor="#000" />
      <View style={styles.photoWrapper}>
        {loading ? (
          <Loader />
        ) : (
          <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        )}
      </View>
      <View style={styles.actionsWrapper}>
        <View style={{ width: windowWidth * 0.8 }}>
          <TouchableOpacity onPress={() => console.log('Add')}>
            <View style={[styles.btnWrapper, styles.btnAdd]}>
              <MaterialCommunityIcons name="heart-outline" color="#000" size={20} />
              <Text style={styles.btnText}>Add to Favorites</Text>
            </View>
          </TouchableOpacity>
          <View style={{ height: 2, backgroundColor: '#C4C4C4' }}></View>
          <TouchableOpacity onPress={() => console.log('Del')}>
            <View style={[styles.btnWrapper, styles.btnDelete]}>
              <MaterialCommunityIcons name="delete-outline" color="#000" size={20} />
              <Text style={styles.btnText}>Delete photo</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  photoWrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
  actionsWrapper: {
    opacity: 0.7,
    position: 'absolute',
    bottom: 50,
    width: windowWidth,
    alignItems: 'center',
  },
  btnWrapper: {
    flexDirection: 'row',
    height: windowWidth * 0.1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAdd: {
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  btnDelete: {
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
  },
  btnText: {
    color: '#000',
    fontSize: 15,
  },
})
