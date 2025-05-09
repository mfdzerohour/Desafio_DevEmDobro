import React, { useContext } from "react";
import { Button } from "@mui/material";
import { ThemeContext } from "../ThemeContext/ThemeContext";

const ThemeToggler = () => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <Button
            variant="contained"
            color="secondary" // Usa a cor definida no tema
            onClick={toggleTheme}
        >
            {darkMode ? "Tema Claro" : "Tema Escuro"}
        </Button>
    );
};

export default ThemeToggler;