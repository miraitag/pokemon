import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { PokemonByID } from '../interfaces/pokemonByID.interface';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
    pokemon: PokemonByID
}

export const PokemonDetailComponent = ({pokemon}:Props) => {
    return (
        <>
            <View 
                style={{
                    ...styles.pokemonDetailDescriptions,
                    padding: 0
                }}
            >
                <Text style={{ 
                        ...styles.pokemonDetailTitle,
                        padding: 20
                    }}
                >
                        Sprites
                </Text>
                <ScrollView
                    horizontal={ true }
                    showsHorizontalScrollIndicator={ false }
                > 
                    <Image 
                        style={ styles.pokemonDetailSprite }
                        source={{ uri: pokemon.sprites.front_default}}
                    />
                    <Image 
                        style={ styles.pokemonDetailSprite }
                        source={{ uri: pokemon.sprites.back_default}}
                    />
                    <Image 
                        style={ styles.pokemonDetailSprite }
                        source={{ uri: pokemon.sprites.front_shiny}}
                    />
                    <Image 
                        style={ styles.pokemonDetailSprite }
                        source={{ uri: pokemon.sprites.back_shiny}}
                    />
                </ScrollView>
            </View>
            <View style={ styles.pokemonDetailDescriptions }>
                <Text style={ styles.pokemonDetailTitle }>Habilidades</Text>
                {
                    pokemon.abilities.map( ({ ability }) => (
                        <Text style={ styles.pokemonDetailText } key={ ability.name }>{ ability.name }</Text>
                    ))
                } 
            </View>
            <View style={ styles.pokemonDetailDescriptions }>
                <Text style={ styles.pokemonDetailTitle }>Formas</Text>
                {
                    pokemon.forms.map( ({ name }) => (
                        <Text style={ styles.pokemonDetailText } key={ name}>{ name}</Text>
                    ))
                }
            </View>
            <View style={ styles.pokemonDetailDescriptions }>
                <Text style={ styles.pokemonDetailTitle }>Types</Text>
                {
                    pokemon.types.map( ({ type }) => (
                        <Text style={ styles.pokemonDetailText } key={ type.name }>{ type.name }</Text>
                    ))
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    pokemonDetailSprite: {
        width: 100,
        height: 100
    },
    pokemonDetailDescriptions: {
        padding: 20,
        backgroundColor: 'rgba(0,0,0, 0.3)',
        marginBottom: 20
    },
    pokemonDetailTitle: {
        fontSize: 20, 
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10
    },
    pokemonDetailText: {
        fontSize: 14,
        color: 'white'
    }
})