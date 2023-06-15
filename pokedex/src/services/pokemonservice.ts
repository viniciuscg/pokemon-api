import { api } from "./api";

export interface IGetPokemonsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[]
}

export interface IGetPokemonResponse {
    height: number;
    id: number;
    name: string;
    species: {
        url: string;
    };
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            }
        }
    };
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        }[]
    }[];
    types: {
        slot: number;
        type: {
            name: string;
            url:string;
        }[]
    }[];
    weight: number;
}

export interface IGetPokemonDetails {
    color: {
        name: "black" | "blue" | "brown" | "gray" | "green" | "pink" | "purple" | "red" | "white" | "yellow";
    };
    evolution_chain: {
        url: string;
    };
    habitat: {
        name: string;
    }
}

export interface IGetPokemonEvolutions {
    chain: {
        "evolves_to": {
            species: {
                name: string | null;
            }
        }[]
    }
}

export interface IGetAllPokemonsReturn extends IGetPokemonResponse {
    color: "black" | "blue" | "brown" | "gray" | "green" | "pink" | "purple" | "red" | "white" | "yellow";
}

export class PokemonService {
    static async getAllPokemons() {
        const response = await api.get<IGetPokemonsResponse>('/pokemon?limit=151');
        const { results } = response.data;
        const promisesArray = results.map(pokemon => {
            return api.get<IGetPokemonResponse>(pokemon.url)
        })
        const promisesResponse = await Promise.all(promisesArray)
        const pokemons =  promisesResponse.map(response => response.data )

        const promisesDetails = pokemons.map(pokemon => {
            return api.get<IGetPokemonDetails>(pokemon.species.url)
        })
        const promisesResponseDetails = await Promise.all(promisesDetails)
        const pokemonColors: IGetAllPokemonsReturn['color'][] = promisesResponseDetails.map(response => response.data.color.name )
        return pokemons.map((pokemon, index) => {
            return {
                ...pokemon,
                color: pokemonColors[index]
            }
        })
    }
    static async getPokemonDetails() {

    }
}