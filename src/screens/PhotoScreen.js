import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// components etc
import Header from '../components/Header'
import Loader from '../components/Loader'
import { colors, windowWidth } from '../styles/variables'
import { ADD_TO_FAVORITES, DELETE_PHOTO_FROM_GALLERY, DEL_FROM_FAVORITES, TRY_AGAIN_LOAD_PHOTO } from '../redux/types'

export default function PhotoScreen({ navigation }) {
  const dispatch = useDispatch()

  const { error, loading, gallery, favorites } = useSelector(state => state)
  const { id, uri } = useSelector(state => state.photo)

  const isFavorite = !!favorites.filter(idFav => idFav === id).length

  let newFavorites = favorites
  let newGallery = gallery

  function addToFavorites() {
    newFavorites.push(id)
    dispatch({ type: ADD_TO_FAVORITES, favorites: newFavorites })
  }

  function delFromFavorites() {
    newFavorites = newFavorites?.filter(nfId => nfId !== id)
    dispatch({ type: DEL_FROM_FAVORITES, favorites: newFavorites })
    navigation.goBack()
  }

  function deletePhotoFromGallery() {
    delFromFavorites()
    newGallery = newGallery?.filter(ngId => ngId.id !== id)
    dispatch({ type: DELETE_PHOTO_FROM_GALLERY, gallery: newGallery })
    navigation.goBack()
  }

  return (
    <>
      <Header title={`Photo ID: ${id}`} goBack bgColor="#000" />

      <View style={styles.photoWrapper}>
        {error ? (
          <Error type={TRY_AGAIN_LOAD_PHOTO} />
        ) : loading ? (
          <Loader />
        ) : (
          <Image source={{ uri }} style={styles.img} resizeMode="contain" />
        )}
      </View>

      <View style={styles.actionsWrapper}>
        <View style={{ width: windowWidth * 0.8 }}>
          <TouchableOpacity onPress={isFavorite ? delFromFavorites : addToFavorites}>
            <View style={[styles.btnWrapper, styles.btnAdd]}>
              <MaterialCommunityIcons
                name={isFavorite ? 'heart' : 'heart-outline'}
                color={isFavorite ? colors.prupleLight : '#000'}
                size={20}
              />
              <Text style={styles.btnText}>{isFavorite ? ' Delete from' : ' Add to'} Favorites</Text>
            </View>
          </TouchableOpacity>
          <View style={{ height: 2, backgroundColor: '#C4C4C4' }}></View>
          <TouchableOpacity onPress={deletePhotoFromGallery}>
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
  img: {
    width: '100%',
    height: '100%',
  },
})
