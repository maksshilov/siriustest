import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
// components etc
import Header from '../components/Header'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { SET_PHOTO_WATCHER } from '../redux/types'
import RenderItem from '../components/RenderItem'

export default function FavScreen() {
  const { loading, error, gallery, favorites } = useSelector(state => state)

  const isFavorite = !!favorites.length

  const datafiltered = favorites?.map(favId => gallery?.filter(ph => ph.id === favId)[0])
  const data = datafiltered?.map(ph => ({
    id: ph.id,
    uri: ph.src.small,
    isFavorite: !!favorites.filter(favId => favId === ph.id).length,
  }))

  const renderItem = ({ item }) => <RenderItem item={item} type={SET_PHOTO_WATCHER} />

  return (
    <>
      <Header title="Favorites" />

      {error ? (
        <Error type={TRY_AGAIN_LOAD_GALLERY} />
      ) : loading ? (
        <Loader />
      ) : isFavorite ? (
        <FlatList data={data} keyExtractor={iten => iten.id} renderItem={renderItem} numColumns={4} />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>
            Самое{'\n'}время{'\n'}сюда{'\n'}что-нибудь{'\n'}добавить :)
          </Text>
        </View>
      )}
    </>
  )
}
