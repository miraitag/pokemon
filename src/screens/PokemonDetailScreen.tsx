import React from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonFetchById } from '../hooks/usePokemonFetchById';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { PokemonDetailComponent } from '../components/PokemonDetailComponent';

interface Props extends StackScreenProps<RootStackParams, 'PokemonDetailScreen'> {};

const { height: heighDimension } = Dimensions.get('window');

export const PokemonDetailScreen = ({ navigation, route }:Props) => {

    const { pokemon, color } = route.params;
    const { top } = useSafeAreaInsets();

    const { isLoading, pokemonId } = usePokemonFetchById( pokemon.id );

    return (
        <ScrollView
            style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: color.background,
                }}>
            {
                isLoading 
                ? 
                    (
                        <View 
                            style={{ 
                                height: heighDimension,
                                justifyContent: 'center'
                            }}
                        >
                            <ActivityIndicator
                                size={ 50 }
                                color={ 'white' }
                            />
                        </View>
                    )
                :
                    (
                        <View 
                            style={{
                                ...styles.pokemonDetailContainer,
                                paddingTop: top
                            }}>
                            <TouchableOpacity
                                activeOpacity={ 0.5 }
                                onPress={ () => navigation.pop() }
                            >
                                <Text style={ styles.pokemonDetailBack }> {'<'} Atras</Text>
                            </TouchableOpacity>
                            <Text style={ styles.pokemonDetailName }>{pokemon.name}</Text>
                            <Image 
                                style={{ height: 400, width: 400 }}
                                source={{ uri: pokemon.image }}
                            />
                            <PokemonDetailComponent pokemon={ pokemonId } />
                        </View>
                    )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pokemonDetailContainer: {
        justifyContent: 'center',
    },
    pokemonDetailBack: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        left: 10
    },
    pokemonDetailName: {
        textAlign:'center',
        fontSize: 50,
        color: 'white',
    }
});