import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Fragment } from 'react/cjs/react.production.min'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
// components etc
import Header from '../components/Header'
import Loader from '../components/Loader'
import { windowWidth } from '../styles/variables'
import { SET_PHOTO, SET_PHOTO_WATCHER } from '../redux/types'
import Error from '../components/Error'

export default function MainScreen({ navigation }) {
  const dispatch = useDispatch()

  const { loading, error, gallery } = useSelector(state => state)

  const data = gallery?.map(ph => ({
    id: ph.id,
    uri: ph.src.small,
  }))

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        dispatch({ type: SET_PHOTO_WATCHER, photo: { id: item.id } })
        navigation.navigate('Elements', { screen: 'Photo', params: { id: item.id, goBack: true } })
      }}>
      <View
        key={item.id}
        style={{
          width: windowWidth / 4,
          height: windowWidth / 4,
          padding: 2,
        }}>
        <Image
          source={{ uri: item.uri }}
          resizeMode="cover"
          style={{ height: '100%', width: '100%', borderRadius: 10 }}
        />
      </View>
    </TouchableOpacity>
  )

  return (
    <Fragment>
      <Header title="Gallery" />
      {error ? (
        <Error />
      ) : loading ? (
        <Loader />
      ) : (
        <FlatList data={data} keyExtractor={iten => iten.id} renderItem={renderItem} numColumns={4} />
      )}
    </Fragment>
  )
}
