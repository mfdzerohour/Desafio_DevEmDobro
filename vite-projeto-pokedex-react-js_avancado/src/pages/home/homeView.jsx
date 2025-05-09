import "./home.css";
import { Grid, Button, Container, Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles"; // Importa o hook useTheme
import NavBar from "../../components/NavBar/NavBar.jsx";
import PokemonCard from "../../components/pokemonCard/pokemonCard.jsx";
import { Skeletons } from "../../components/Skeletons/Skeletons.jsx";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PokemonDetails from "../pokemonDetails/pokemonDetails.jsx";

export const HomeView = () => {
    const [pokemons, setPokemons] = useState([]);
    const [allPokemons, setAllPokemons] = useState([]); // Estado para manter todos os Pokémons
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [offset, setOffset] = useState(0); // Estado para controlar o deslocamento (quantos Pokémons já foram carregados)
    const [searchMode, setSearchMode] = useState("name"); // Novo estado para modo de busca
    const [availableTypes, setAvailableTypes] = useState([]); // Tipos exibidos
    const [selectedPokemon, setSelectedPokemon] = useState(null); // Novo estado para o Pokémon selecionado

    const theme = useTheme(); // Acessa o tema atual

    useEffect(() => {
        // Aplica a cor de fundo dinamicamente ao body
        document.body.style.backgroundColor = theme.palette.background.default;
    }, [theme]);

    useEffect(() => {
        // Carrega os primeiros 10 Pokémons ao montar o componente
        loadInitialPokemons();
    }, []);

    useEffect(() => {
        const typesSet = new Set();
        allPokemons.forEach((pokemon) => {
            pokemon.types.forEach((t) => typesSet.add(t.type.name));
        });
        setAvailableTypes(Array.from(typesSet).sort());
    }, [allPokemons]);

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

    // Função para filtrar e buscar pokémons
    const pokemonFilter = async (value, mode = searchMode) => {
        if (value === "") {
            setPokemons(allPokemons); // Restaure todos os Pokémons se a pesquisa estiver vazia
        } else if (mode === "name") {
            const filteredPokemons = allPokemons.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(value.toLowerCase())
            );
            if (filteredPokemons.length > 0) {
                setPokemons(filteredPokemons);
            } else {
                // Busca na API se não encontrar localmente
                try {
                    setLoading(true);
                    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`);
                    const newPokemon = {
                        name: res.data.name,
                        image: res.data.sprites.front_default,
                        types: res.data.types,
                        moves: res.data.moves,
                        abilities: res.data.abilities,
                        height: res.data.height,
                        weight: res.data.weight,
                    };
                    setPokemons([newPokemon]);
                    setAllPokemons((prev) => {
                        // Só adiciona se não existir
                        if (!prev.some((p) => p.name === newPokemon.name)) {
                            return [...prev, newPokemon];
                        }
                        return prev;
                    });
                } catch {
                    setPokemons([]);
                } finally {
                    setLoading(false);
                }
            }
        } else if (mode === "type") {
            const filteredPokemons = allPokemons.filter((pokemon) =>
                pokemon.types.some((t) =>
                    t.type.name.toLowerCase().includes(value.toLowerCase())
                )
            );
            setPokemons(filteredPokemons);
        }
    };

    // Função para abrir o modal com detalhes
    const handleOpenDetails = async (pokemon) => {
        setSelectedPokemon(null); // Limpa o estado para mostrar o loading
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            setSelectedPokemon({
                ...res.data,
                image: res.data.sprites.front_default, // mantém compatibilidade
            });
        } catch {
            setSelectedPokemon({ name: pokemon.name, error: 'Erro ao buscar detalhes.' });
        }
    };

    // Função para fechar o modal
    const handleCloseDetails = () => {
        setSelectedPokemon(null);
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
                <NavBar
                    pokemonFilter={pokemonFilter}
                    searchMode={searchMode}
                    setSearchMode={setSearchMode}
                    availableTypes={availableTypes}
                />
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
                                <div
                                    onClick={() => handleOpenDetails(pokemon)}
                                    style={{ cursor: "pointer", height: "100%" }}
                                >
                                    <PokemonCard
                                        name={pokemon.name}
                                        image={pokemon.image}
                                        types={pokemon.types}
                                        moves={pokemon.moves}
                                        abilities={pokemon.abilities}
                                        // Adiciona as props traduzidas
                                        labelTypes="Tipos"
                                        labelMoves="Movimentos"
                                        labelAbilities="Habilidades"
                                    />
                                </div>
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
            {/* Modal de detalhes do Pokémon */}
            <Dialog
                open={!!selectedPokemon}
                onClose={handleCloseDetails}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    Detalhes do Pokémon
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDetails}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {selectedPokemon && (
                        <PokemonDetails pokemon={selectedPokemon} />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};