import React from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// components etc
import { colors, windowWidth } from '../styles/variables'

export default function RenderItem({ item, type }) {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { id, uri, isFavorite } = item

  function handleOpenPhoto() {
    dispatch({ type, photo: { id } })
    navigation.navigate('Elements', { screen: 'Photo', params: { id, goBack: true } })
  }

  return (
    <TouchableOpacity onPress={handleOpenPhoto}>
      <View key={id} style={styles.imgWrapper}>
        <Image source={{ uri }} resizeMode="cover" style={styles.img} />
        {isFavorite ? (
          <View style={styles.like}>
            <MaterialCommunityIcons name="heart" color={colors.heart} size={22} />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imgWrapper: {
    width: windowWidth / 4,
    height: windowWidth / 4,
    padding: 2,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  like: {
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
})
