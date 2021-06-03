import React from 'react'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonFetch } from '../hooks/usePokemonFetch';
import { PokeCardComponent } from '../components/PokeCardComponent';


export const PokemonHomeScreen = () => {

    const {isLoading, pokemons, getPokemons } = usePokemonFetch();
    const { top } = useSafeAreaInsets();

    return (
        <>
            <View style={{ top: top + 20 }}>
                {
                    isLoading 
                    ? 
                        (
                            <ActivityIndicator 
                                color='white'
                                size={ 50 }
                            />
                        )
                    : 
                        <FlatList
                            data={ pokemons }
                            keyExtractor={ (pokemon) => pokemon.id }
                            showsVerticalScrollIndicator={ false }
                            renderItem={ ({ item }) => (
                                <PokeCardComponent pokemon={ item }/>
                            )}
                            ListFooterComponent={(
                                <ActivityIndicator 
                                    style={{ height: 100}}
                                    size={ 50 }
                                    color='red'
                                /> 
                            )}
                            onEndReached={ getPokemons }
                            onEndReachedThreshold={ 0.5 }
                        />
                }
            </View>
        </>
    )
}
