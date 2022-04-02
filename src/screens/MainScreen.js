import React from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
// components etc
import Header from '../components/Header'
import Loader from '../components/Loader'
import Error from '../components/Error'
import RenderItem from '../components/RenderItem'
import { SET_PHOTO_WATCHER, TRY_AGAIN_LOAD_GALLERY } from '../redux/types'

export default function MainScreen() {
  const { loading, error, gallery, favorites } = useSelector(state => state)

  const data = gallery?.map(ph => ({
    id: ph.id,
    uri: ph.src.small,
    isFavorite: !!favorites.filter(favId => favId === ph.id).length,
  }))

  const renderItem = ({ item }) => <RenderItem item={item} type={SET_PHOTO_WATCHER} />

  return (
    <>
      <Header title="Gallery" />
      {error ? (
        <Error type={TRY_AGAIN_LOAD_GALLERY} />
      ) : loading ? (
        <Loader />
      ) : (
        <FlatList data={data} keyExtractor={iten => iten.id} renderItem={renderItem} numColumns={4} />
      )}
    </>
  )
}
