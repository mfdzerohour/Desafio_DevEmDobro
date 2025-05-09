import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? "dark" : "light",
                    ...(darkMode
                        ? {
                                // Tema escuro
                                primary: {
                                    main: "#212121", // Cor principal (NavBar)
                                },
                                secondary: {
                                    main: "#ff0000", // Vermelho para botões no tema escuro
                                },
                                background: {
                                    default: "#564c4c", // Fundo da página (cinza claro)
                                    paper: "#4d4646", // Fundo de elementos
                                },
                                text: {
                                    primary: "#ffffff", // Texto principal
                                    secondary: "#bdbdbd", // Texto secundário
                                },
                            }
                            : {
                                // Tema claro
                                primary: {
                                    main: "#be2828", // Cor principal (NavBar)
                                },
                                secondary: {
                                    main: "#2222e3", // Azul para botões no tema claro
                                },
                                background: {
                                    default: "#ffffff", // Fundo da página (branco)
                                    paper: "#f5f5f5", // Fundo de elementos
                                },
                                text: {
                                    primary: "#000000", // Texto principal
                                    secondary: "#757575", // Texto secundário
                                },
                            }
                        ),
                },
            }),
        [darkMode]
    );

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};