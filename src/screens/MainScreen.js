import React, {useState, useEffect} from 'react'
import {Fragment} from 'react/cjs/react.production.min'
import {Dimensions, View, Text, Image, FlatList, TouchableOpacity} from 'react-native'
import {createClient} from 'pexels'

import Header from '../components/Header'

const {width: windowWidth, height: windowHeight} = Dimensions.get('window')

export default function MainScreen({navigation}) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const client = createClient('563492ad6f91700001000001757b6bd2d3cb4877a0bce035be1e347f')
    const query = 'Nature'
    client.photos.search({query, per_page: 9}).then(photos => {
      setData(() =>
        photos['photos'].map(ph => ({
          id: ph.id,
          uri: ph.src.small,
        })),
      )
    })
  }, [])

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Elements', {screen: 'Photo', params: {id: item.id, goBack: true}})}>
      <View
        key={item.id}
        style={{
          width: windowWidth / 4,
          height: windowWidth / 4,
          padding: 2,
        }}>
        <Image source={{uri: item.uri}} resizeMode="cover" style={{height: '100%', width: '100%', borderRadius: 10}} />
      </View>
    </TouchableOpacity>
  )

  return (
    <Fragment>
      <Header title="Gallery" />

      <View>
        <FlatList data={data} keyExtractor={iten => iten.id} renderItem={renderItem} numColumns={4} />
      </View>
    </Fragment>
  )
}
