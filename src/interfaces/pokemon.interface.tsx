
export interface PokemonResult {
    count:    number;
    next:     string;
    previous: null;
    results:  Pokemon[];
}

export interface Pokemon {
    name: string;
    url:  string;
}

export interface PokemonFull {
    name: string;
    id: string;
    image: string;
    color?: string;
}