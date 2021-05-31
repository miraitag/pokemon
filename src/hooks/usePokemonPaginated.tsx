import React, { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, SimplePokemon, Result } from '../interfaces/pokemon.interfaces';

export const usePokemonPaginated = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon>([]);
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

    const loadPokemons = async() => {
        const response = await pokemonApi.get<PokemonPaginatedResponse>( nextPageUrl.current );
        nextPageUrl.current = response.data.next;
        mapPokemonSimple( response.data.results );
    }

    const mapPokemonSimple = ( pokemonList: Result[]) => {
        const newPokemonList: SimplePokemon[] =  pokemonList.map(({ name, url }) => {
            const urlParse = url.split('/');
            const id = urlParse[ urlParse.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return { id, picture, name };
        });

        setSimplePokemonList([ ...simplePokemonList, ...newPokemonList ]);
        setIsLoading( false );
    };

    useEffect(() => {
        loadPokemons();
    }, []);

    return {
        isLoading,
        simplePokemonList,
        loadPokemons
    }
}
