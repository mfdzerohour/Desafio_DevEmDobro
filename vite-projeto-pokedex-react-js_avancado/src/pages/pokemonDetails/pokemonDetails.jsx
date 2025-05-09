import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
    const { name } = useParams(); // Obtém o parâmetro "name" da URL
    const [pokemon, setPokemon] = useState(null); // Estado para armazenar os detalhes do Pokémon
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [error, setError] = useState(null); // Estado para erros

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar os detalhes do Pokémon.");
                }
                const data = await response.json();
                setPokemon(data); // Armazena os detalhes do Pokémon no estado
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [name]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <div style={{ padding: "2em" }}>
            <h1>Detalhes do Pokémon</h1>
            {pokemon && (
                <div>
                    <img
                        src={pokemon.sprites?.other["official-artwork"].front_default}
                        alt={pokemon.name}
                        style={{ width: "200px", height: "200px" }}
                    />
                    <p><strong>Nome:</strong> {pokemon.name}</p>
                    <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
                    <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
                    <p><strong>Tipos:</strong> {pokemon.types.map((type) => type.type.name).join(", ")}</p>
                    <p><strong>Habilidades:</strong> {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
                </div>
            )}
        </div>
    );
};

export default PokemonDetails;

// import React from "react";
// import { useParams } from "react-router-dom";

// const PokemonDetails = () => {
//     const { name } = useParams();

//     return (
//         <div>
//             <h1>Detalhes do Pokémon</h1>
//             <p>Nome: {name}</p>
//         </div>
//     );
// };

// export default PokemonDetails;