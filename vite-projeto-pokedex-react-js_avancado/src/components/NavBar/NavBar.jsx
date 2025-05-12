import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha, useTheme } from "@mui/material/styles";
import pokemonLogo from "../../images/pokemonLogo.png";
import ThemeToggler from "../ThemeToggler/ThemeToggler.jsx";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

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

export default function NavBar({ pokemonFilter, searchMode, setSearchMode, availableTypes }) {
    const theme = useTheme(); // Acessa o tema atual
    const [searchValue, setSearchValue] = React.useState("");

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        pokemonFilter(event.target.value, searchMode);
    };

    const handleModeChange = (event) => {
        setSearchMode(event.target.value);
        setSearchValue("");
        pokemonFilter("", event.target.value);
    };

    const handleTypeChange = (event) => {
        setSearchValue(event.target.value);
        pokemonFilter(event.target.value, "type");
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

                    {/* Campo de busca e seletor de modo */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "1em",
                            marginRight: "1em",
                        }}
                    >
                        <FormControl
                            sx={{ minWidth: 120, marginRight: 2 }}
                            size="small"
                        >
                            <InputLabel
                                id="search-mode-label"
                                sx={{
                                    color: "#fff",
                                    "&.Mui-focused": {
                                        color: "#fff",
                                    },
                                }}
                            >
                                Buscar por
                            </InputLabel>
                            <Select
                                labelId="search-mode-label"
                                id="search-mode"
                                value={searchMode}
                                label="Buscar por"
                                onChange={handleModeChange}
                                sx={{
                                    backgroundColor: alpha(
                                        theme.palette.common.white,
                                        0.15
                                    ),
                                    color: "#fff",
                                    borderRadius: 1,
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',
                                    },
                                    '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#fff',
                                    },
                                    // Corrige o hover do container do Select
                                    '&.MuiOutlinedInput-root:hover': {
                                        borderColor: '#fff',
                                    },
                                }}
                            >
                                <MenuItem
                                    value="name"
                                    sx={{
                                        background: '#fff',
                                        color: '#000',
                                        '&.Mui-selected': {
                                            backgroundColor: theme.palette.secondary.main,
                                            color: '#fff',
                                        },
                                        '&.Mui-selected:hover': {
                                            backgroundColor: theme.palette.secondary.main,
                                            color: '#fff',
                                        },
                                        '&:hover': {
                                            backgroundColor: theme.palette.secondary.main,
                                            color: '#fff',
                                        },
                                    }}
                                >
                                    Nome
                                </MenuItem>
                                <MenuItem
                                    value="type"
                                    sx={{
                                        background: '#fff',
                                        color: '#000',
                                        '&.Mui-selected': {
                                            backgroundColor: theme.palette.secondary.main,
                                            color: '#fff',
                                        },
                                        '&.Mui-selected:hover': {
                                            backgroundColor: theme.palette.secondary.main,
                                            color: '#fff',
                                        },
                                        '&:hover': {
                                            backgroundColor: theme.palette.secondary.main,
                                            color: '#fff',
                                        },
                                    }}
                                >
                                    Tipo
                                </MenuItem>
                            </Select>
                        </FormControl>

                        {searchMode === "name" && (
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Buscar…"
                                    inputProps={{ "aria-label": "search" }}
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                />
                            </Search>
                        )}

                        {searchMode === "type" && (
                            <FormControl sx={{ minWidth: 120, marginLeft: 2, transition: 'width 0.2s, margin 0.2s' }} size="small">
                                <InputLabel
                                    id="type-select-label"
                                    sx={{
                                        color: "#fff",
                                        '&.Mui-focused': {
                                            color: "#fff",
                                        },
                                    }}
                                    shrink={true} // Força o label a ficar sempre acima
                                >
                                    Tipo
                                </InputLabel>
                                <Select
                                    labelId="type-select-label"
                                    id="type-select"
                                    value={searchValue}
                                    label="Tipo"
                                    onChange={handleTypeChange}
                                    sx={{
                                        backgroundColor: alpha(
                                            theme.palette.common.white,
                                            0.15
                                        ),
                                        color: "#fff",
                                        borderRadius: 1,
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#fff',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#fff',
                                        },
                                        '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#fff',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#fff',
                                        },
                                        '&.MuiOutlinedInput-root:hover': {
                                            borderColor: '#fff',
                                        },
                                    }}
                                    displayEmpty
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: alpha(theme.palette.common.white, 0.15),
                                                '& .MuiMenuItem-root': {
                                                    backgroundColor: '#fff',
                                                    color: '#000',
                                                    '&.Mui-selected': {
                                                        backgroundColor: theme.palette.secondary.main,
                                                        color: '#fff',
                                                    },
                                                    '&.Mui-selected:hover': {
                                                        backgroundColor: theme.palette.secondary.main,
                                                        color: '#fff',
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: theme.palette.secondary.main,
                                                        color: '#fff',
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Todos</em>
                                    </MenuItem>
                                    {availableTypes.map((type) => (
                                        <MenuItem
                                            key={type}
                                            value={type}
                                            sx={{
                                                background: '#fff',
                                                color: '#000',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.secondary.main,
                                                    color: '#fff',
                                                },
                                                '&.Mui-selected': {
                                                    backgroundColor: theme.palette.secondary.main,
                                                    color: '#fff',
                                                },
                                                '&.Mui-selected:hover': {
                                                    backgroundColor: theme.palette.secondary.main,
                                                    color: '#fff',
                                                },
                                            }}
                                        >
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Box>

                    {/* Alternador de tema */}
                    <ThemeToggler />
                </Toolbar>
            </AppBar>
            {/* Espaço para evitar sobreposição da AppBar */}
            <Toolbar />
        </Box>
    );
}