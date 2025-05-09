import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./pages/home/homeView";
import PokemonDetails from "./pages/pokemonDetails/pokemonDetails";

function App() {
    return (
        <Router>
            <Routes>
                {/* Rota para a página inicial */}
                <Route path="/" element={<HomeView />} />

                {/* Rota para a página de detalhes do Pokémon */}
                <Route path="/pokemon/:name" element={<PokemonDetails />} />
            </Routes>
        </Router>
    );
}

export default App;