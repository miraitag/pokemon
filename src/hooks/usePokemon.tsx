import React, { useState, useEffect } from 'react'
import { PokemonFull } from '../interfaces/pokemon.interfaces';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemon = ( id:string) => {

    const [ isLoading, setIsLoading ] = useState(true);
    const [ pokemon, setPokemon ] = useState<PokemonFull>();

    const loadPokemon = async() => {
        const response = await pokemonApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon( response.data );
        setIsLoading( false );
    }

    useEffect(() => {
        loadPokemon();
    }, []);

    return {
        pokemon,
        isLoading
    }

}
