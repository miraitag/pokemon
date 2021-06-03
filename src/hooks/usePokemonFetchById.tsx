import React, { useEffect, useState } from 'react'
import { PokemonByID } from '../interfaces/pokemonByID.interface';

export const usePokemonFetchById = ( id:string ) => {

    const [isLoading, setIsLoading] = useState(true);
    const [pokemonId, setPokemonId] = useState<PokemonByID>({});

    const getPokemonById = async() => {
        const query:Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const response:PokemonByID = await query.json();
        setPokemonId( response );
        setIsLoading( false );
    }

    useEffect(() => {
        getPokemonById();
    }, []);

    return {
        isLoading,
        pokemonId
    }
}
