import React from 'react'
import { Image, FlatList, ActivityIndicator, Text, View } from 'react-native';
import { styles } from '../theme/appTheme';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { PokemonCard } from "../components/PokemonCard";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets()

    const { isLoading, simplePokemonList, loadPokemons } = usePokemonPaginated();

    return (
        <>
            <Image
                source={ require('../assets/pokebola.png')}
                style={ styles.pokebolaBG }
            />
            <View style={{ alignItems: 'center' }} 
             >
                <FlatList 
                    data={ simplePokemonList }
                    keyExtractor={ (pokemon) => pokemon.id }
                    showsVerticalScrollIndicator={ false }
                    numColumns={ 2 }
                    renderItem={ ({ item }) => (
                        <PokemonCard  pokemon={ item } />
                    )}

                    // Header
                    ListHeaderComponent={ 
                        <Text 
                            style={{
                                ...styles.title,
                                ...styles.globalMargin,
                                top: top + 20,
                                marginBottom: top + 20,
                                paddingBottom: 10
                            }}
                        >
                            Pokedex
                        </Text>
                    }

                    // Infinite Scroll
                    onEndReached={ loadPokemons }
                    onEndReachedThreshold={ 0.4 }

                    ListFooterComponent={(
                        <ActivityIndicator 
                            style={{ height: 100}}
                            size={ 20 }
                            color='grey'
                        /> 
                    )}
                />
            </View>
        </>
    )
}
