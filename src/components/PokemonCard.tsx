import React, { useState, useEffect, useRef } from 'react'
import ImageColors from 'react-native-image-colors'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemon.interfaces';
import { FadeInImage } from './FadeInImage';
import { useNavigation } from '@react-navigation/native';

const { width: windowWith } = Dimensions.get('window');

interface Props {
    pokemon: SimplePokemon
}

export const PokemonCard = ({ pokemon }: Props) => {

    const [bgColor, setBgColor] = useState('gray');
    const isMounted = useRef(true);
    const navigation = useNavigation();

    useEffect(() => {
        ImageColors.getColors(pokemon.picture, { fallback: 'gray'})
            .then( (colors: any) => {
                
                if( !isMounted.current ) return;

                ( colors.platform === 'android')
                    ? setBgColor(colors.dominant || 'gray')
                    : setBgColor( colors.background || 'gray');
            });

        return () => {
            isMounted.current = false;
        }
    }, []);

    return (
        <TouchableOpacity
            activeOpacity={ 0.9 }
            onPress={ () => navigation.navigate('PokemonScreen', { 
                    simplePokemon: pokemon,
                    color: bgColor
                }) 
            }
        >
            <View style={{
                    ...styles.cardContainer,
                    width: windowWith * 0.4,
                    backgroundColor: bgColor
                }}
            >   
                {/* Nombre y ID */}
                <View>
                    <Text style={ styles.name }>
                        { pokemon.name }
                        { '\n#'+ pokemon.id }
                    </Text>
                </View>
                <View style={ styles.pokebolaContainer }>
                    <Image
                        style={ styles.pokebola }
                        source={ require('../assets/pokebola-blanca.png') } 
                    />
                </View>

                <FadeInImage 
                    uri={ pokemon.picture }
                    style={ styles.pokemonImage }
                />

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 150,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        opacity: 0.5
    }
})