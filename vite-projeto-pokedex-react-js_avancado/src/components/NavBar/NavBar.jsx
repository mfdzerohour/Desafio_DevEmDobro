import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha, useTheme } from "@mui/material/styles";
import pokemonLogo from "../../images/pokemonLogo.png";
import ThemeToggler from "../ThemeToggler/ThemeToggler.jsx";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
    },
}));

export default function NavBar({ pokemonFilter }) {
    const theme = useTheme(); // Acessa o tema atual

    const handleSearchChange = (event) => {
        pokemonFilter(event.target.value);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: theme.palette.primary.main, // Usa a cor dinâmica do tema
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {/* Logo */}
                    <Box component="img" src={pokemonLogo} height="3em" />

                    {/* Campo de busca */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "1em",
                            marginRight: "1em",
                        }}
                    >
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Buscar Pokémon..."
                                inputProps={{ "aria-label": "search" }}
                                onChange={handleSearchChange}
                            />
                        </Search>
                    </Box>

                    {/* Botão de alternância de tema */}
                    <ThemeToggler />
                </Toolbar>
            </AppBar>
            {/* Adicione um espaçamento maior para evitar sobreposição do conteúdo */}
            <Toolbar sx={{ marginBottom: "2em" }} />
        </Box>
    );
}