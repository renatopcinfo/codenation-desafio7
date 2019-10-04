import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

import * as Apollo from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const Main = () => {
  return (
    <View style={styles.container}>
      <Pokemons />
    </View>
  );
}

const Pokemons = () => {
  const getPokemons = Apollo.gql(`
    query pokemons($first: Int!) {
      pokemons(first: $first) {
        id
        number
        name
        image
        types
      }
    }
  `);

  const { loading, error, data } = useQuery(getPokemons, {
    variables: { first: 20 },
  });

  if (loading) {
    return (<ActivityIndicator size='large' color='#7800ff' />);
  }
  if (error) {
    return (<Text>Erro</Text>);
  }

  return (
    <ScrollView style={{ flex: 1, width: '100%' }}>
      {data.pokemons.map(pokemon => (
        <View key={pokemon.number} style={styles.element}>
          <View style={{ width: '100%', height: 200 }}>
            <Image className='pokemon-image' source={{ uri: pokemon.image }} style={styles.image} />
          </View>
          <View style={{ backgroundColor: '#777', width: '100%' }}>
            <Text className='pokemon-name' style={styles.text}>{pokemon.number} - {pokemon.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              {pokemon.types.map(type => (
                <View key={type} style={{ marginHorizontal: 5 }}>
                  <Text className='pokemon-type' style={styles.text}>{type}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  element: {
    marginBottom: 12,
    alignItems: 'center',
    width: '100%'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'center'
  },
  text: {
    color: '#fff'
  }
});