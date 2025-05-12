import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

const PokemonDetails = ({ pokemon }) => {
    if (!pokemon) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                {pokemon.name}
            </Typography>
            <img
                src={
                    pokemon.image ||
                    pokemon.sprites?.other?.["official-artwork"]?.front_default
                }
                alt={pokemon.name}
                style={{ width: "200px", height: "200px" }}
            />
            {pokemon.height && (
                <Typography>
                    <strong>Altura:</strong> {pokemon.height / 10} m
                </Typography>
            )}
            {pokemon.weight && (
                <Typography>
                    <strong>Peso:</strong> {pokemon.weight / 10} kg
                </Typography>
            )}
            <Typography>
                <strong>Tipos:</strong>{" "}
                {pokemon.types?.map((type) => type.type.name).join(", ")}
            </Typography>
            <Typography>
                <strong>Habilidades:</strong>{" "}
                {pokemon.abilities
                    ?.map((ability) => ability.ability.name)
                    .join(", ")}
            </Typography>
            <Typography>
                <strong>Moves:</strong>{" "}
                {pokemon.moves
                    ?.slice(0, 5)
                    .map((move) => move.move.name)
                    .join(", ")}
            </Typography>
        </Box>
    );
};

export default PokemonDetails;
