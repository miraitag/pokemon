import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageColors from 'react-native-image-colors'
import { PokemonFull } from '../interfaces/pokemon.interface';

const { width: widthDimension } = Dimensions.get('window');

interface Props {
    pokemon: PokemonFull
}

export const PokeCardComponent = ( { pokemon }:Props ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [color, setColor] = useState({background: 'gray', border: 'black'});
    const isMounted = useRef(true);
    const navigation = useNavigation();

    const getColors = async() => {
        if( !isMounted.current ) return;

        try {
            const colors = await ImageColors.getColors(pokemon.image, { fallback: 'gray' });
            if( colors.platform === 'android') {
                setColor({background: colors.dominant, border: colors.vibrant} || {background: 'gray', border: 'black'});
                setIsLoading( false);
            } else {
                setColor({background: colors.background, border: colors.detail} ||{background: 'gray', border: 'black'});
                setIsLoading( false);
            }
        } catch (error) {
            console.error('ERROR POKECARD ', error);
        }
    }


    useEffect(() => {
        getColors();
        return () => {
            isMounted.current = false;
        }
    }, [])
    return (
        <TouchableOpacity
            activeOpacity={ 0.5 }
            onPress={ () => navigation.navigate('PokemonDetailScreen',{
                    pokemon,
                    color
                }) 
            }
        >
            <View style={{ 
                ...styles.pokeCardContainer,
                backgroundColor: color.background,
                width: widthDimension,
                borderWidth: 2,
                borderBottomColor: color.border,
                borderTopColor: color.border, 
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent'
            }}>
                {
                    isLoading 
                    ?
                    (
                        <View style={ styles.pokeCardIndicator }>
                            <ActivityIndicator 
                                color={ 'white' }
                                size={ 50 }
                            />
                        </View>
                    )
                    :
                    (    
                        <>
                            <Image
                                style={ styles.pokeCardImage }
                                source={{
                                    uri: pokemon.image
                                }}
                            />
                            <Text style={ styles.pokeCardText }>{ pokemon.name }</Text>
                            <Image
                                style={ styles.pokeCardBackground }
                                source={{
                                    uri: pokemon.image
                                }}
                            />            
                        </>
                    )
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    pokeCardContainer: {
        width: 200,
        height: 150,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    pokeCardText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        top: 0,
        alignSelf: 'center',
        textShadowColor: 'black',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    pokeCardImage: {
        width: 150,
        height: 150,
    },
    pokeCardBackground: {
        position: 'absolute',
        alignSelf: 'center',
        right: -80,
        width: 350,
        height: 350,
        opacity: 0.3,
        zIndex: -1,
        bottom: -150
    },
    pokeCardIndicator: {
        flex: 1,
        justifyContent: 'center',
    } 
})