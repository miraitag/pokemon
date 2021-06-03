import { useEffect, useState, useRef } from "react";
import { PokemonResult, Pokemon, PokemonFull } from '../interfaces/pokemon.interface';

export const usePokemonFetch = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [pokemons, setPokemons] = useState<PokemonFull[]>([]);
    const nextRequestPokemons = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');
    const getPokemons = async () => {
        try {
            const request:Response = await fetch( nextRequestPokemons.current );
            const response:PokemonResult = await request.json();
            nextRequestPokemons.current = response.next;
            setPokemonsFull(response.results);
        } catch (error) {
            console.error('ERROR', error);
            setPokemons([]);
            setIsLoading( false );
        } 
     
    }

    const getPokemonsFull = ( pokes:Pokemon[] ):PokemonFull[] => {
        return pokes.map( ({ name, url} ) => {
            const urlSplit = url.split('/');
            const id = urlSplit[ urlSplit.length - 2];
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            return {
                id,
                image,
                name
            }
        });
    }

    const setPokemonsFull = ( results:Pokemon[] ) => {
        const pokemonsFull = getPokemonsFull( results );
        setPokemons([...pokemons, ...pokemonsFull]);
        setIsLoading( false );
    }

    useEffect(() => {
        getPokemons();
    }, [])


    return {
        isLoading,
        pokemons,
        getPokemons
    }
}
