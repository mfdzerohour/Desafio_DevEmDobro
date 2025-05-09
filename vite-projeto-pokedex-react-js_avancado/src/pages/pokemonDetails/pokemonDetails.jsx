import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography, Box } from "@mui/material";

const PokemonDetails = () => {
    const { name } = useParams(); // Obtém o parâmetro "name" da URL
    const [pokemon, setPokemon] = useState(null); // Estado para armazenar os detalhes do Pokémon
    const [loading, setLoading] = useState(true); // Estado de carregamento
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
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                {pokemon.name}
            </Typography>
            <img
                src={pokemon.sprites?.other["official-artwork"].front_default}
                alt={pokemon.name}
                style={{ width: "200px", height: "200px" }}
            />
            <Typography>
                <strong>Altura:</strong> {pokemon.height / 10} m
            </Typography>
            <Typography>
                <strong>Peso:</strong> {pokemon.weight / 10} kg
            </Typography>
            <Typography>
                <strong>Tipos:</strong>{" "}
                {pokemon.types.map((type) => type.type.name).join(", ")}
            </Typography>
            <Typography>
                <strong>Habilidades:</strong>{" "}
                {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
            </Typography>
        </Box>
    );
};

export default PokemonDetails;