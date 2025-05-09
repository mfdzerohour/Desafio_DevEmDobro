import "./home.css";
import { Grid, Button, Container, Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles"; // Importa o hook useTheme
import NavBar from "../../components/NavBar/NavBar.jsx";
import PokemonCard from "../../components/pokemonCard/pokemonCard.jsx";
import { Skeletons } from "../../components/Skeletons/Skeletons.jsx";

export const HomeView = () => {
    const [pokemons, setPokemons] = useState([]);
    const [allPokemons, setAllPokemons] = useState([]); // Estado para manter todos os Pokémons
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [offset, setOffset] = useState(0); // Estado para controlar o deslocamento (quantos Pokémons já foram carregados)

    const theme = useTheme(); // Acessa o tema atual

    useEffect(() => {
        // Aplica a cor de fundo dinamicamente ao body
        document.body.style.backgroundColor = theme.palette.background.default;
    }, [theme]);

    useEffect(() => {
        // Carrega os primeiros 10 Pokémons ao montar o componente
        loadInitialPokemons();
    }, []);

    const loadInitialPokemons = () => {
        setLoading(true); // Ativa o estado de carregamento
        const initialEndpoints = [];

        for (let i = 1; i <= 10; i++) {
            initialEndpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
        }

        axios
            .all(initialEndpoints.map((endpoint) => axios.get(endpoint)))
            .then((res) => {
                const initialPokemonData = res.map((response) => ({
                    name: response.data.name,
                    image: response.data.sprites.front_default, // Adicione a URL da imagem
                    types: response.data.types, // Adicione os tipos
                    moves: response.data.moves, // Adicione os movimentos
                    abilities: response.data.abilities, // Adicione as habilidades
                }));

                setPokemons(initialPokemonData); // Define os primeiros 10 Pokémons
                setAllPokemons(initialPokemonData); // Atualiza a lista completa
                setOffset(10); // Define o offset inicial como 10
                setLoading(false); // Desativa o estado de carregamento
            })
            .catch((err) => {
                console.log(err);
                setLoading(false); // Desativa o estado de carregamento em caso de erro
            });
    };

    const loadMorePokemons = () => {
        setLoading(true); // Ativa o estado de carregamento
        const newEndpoints = [];

        for (let i = offset + 1; i <= offset + 10; i++) {
            newEndpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
        }

        axios
            .all(newEndpoints.map((endpoint) => axios.get(endpoint)))
            .then((res) => {
                const newPokemonData = res.map((response) => ({
                    name: response.data.name,
                    image: response.data.sprites.front_default, // Adicione a URL da imagem
                    types: response.data.types, // Adicione os tipos
                    moves: response.data.moves, // Adicione os movimentos
                    abilities: response.data.abilities, // Adicione as habilidades
                }));

                // Filtra Pokémons duplicados
                const uniquePokemons = newPokemonData.filter(
                    (newPokemon) =>
                        !allPokemons.some(
                            (existingPokemon) =>
                                existingPokemon.name === newPokemon.name
                        )
                );

                setPokemons((prevPokemons) => [
                    ...prevPokemons,
                    ...uniquePokemons,
                ]); // Adiciona apenas Pokémons únicos
                setAllPokemons((prevAllPokemons) => [
                    ...prevAllPokemons,
                    ...uniquePokemons,
                ]); // Atualiza a lista completa
                setOffset((prevOffset) => prevOffset + 10); // Incrementa o deslocamento
                setLoading(false); // Desativa o estado de carregamento
            })
            .catch((err) => {
                console.log(err);
                setLoading(false); // Desativa o estado de carregamento em caso de erro
            });
    };

    const pokemonFilter = (name) => {
        if (name === "") {
            setPokemons(allPokemons); // Restaure todos os Pokémons se a pesquisa estiver vazia
        } else {
            const filteredPokemons = allPokemons.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(name.toLowerCase())
            );
            setPokemons(filteredPokemons);
        }
    };

    return (
        <>
            {/* Alinha NavBar horizontalmente */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1em",
                }}
            >
                <NavBar pokemonFilter={pokemonFilter} />
            </Box>
            <Container maxWidth="false">
                <Grid container spacing={3} alignItems="stretch">
                    {loading && pokemons.length === 0 ? (
                        <Skeletons />
                    ) : (
                        pokemons.map((pokemon, key) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                xl={2}
                                key={key}
                            >
                                <PokemonCard
                                    name={pokemon.name}
                                    image={pokemon.image}
                                    types={pokemon.types}
                                    moves={pokemon.moves}
                                    abilities={pokemon.abilities}
                                />
                            </Grid>
                        ))
                    )}
                </Grid>
                {loading && pokemons.length > 0 && <Skeletons />}{" "}
                {/* Exibe Skeletons enquanto carrega mais Pokémons */}
                <Button
                    variant="contained"
                    color="secondary" // Usa a cor definida no tema
                    onClick={loadMorePokemons}
                    disabled={loading}
                    sx={{
                        marginTop: "1em",
                        marginBottom: "10px",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    {loading ? "Carregando..." : "Carregar +10 Pokémons"}
                </Button>
            </Container>
        </>
    );
};
