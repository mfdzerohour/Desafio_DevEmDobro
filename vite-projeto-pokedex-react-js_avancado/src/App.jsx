import { HomeView } from './pages/home/homeView.jsx'

function App() {
    return (
        <>
            <HomeView />
        </>
    )
}

export default App;

// IMPLEMENTANDO A ROTA COMO DEVERIA FICAR MAS NÂO FUNCIONA
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomeView from "./pages/home/homeView";
// import PokemonDetails from "./pages/pokemonDetails/pokemonDetails";

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 {/* Página inicial */}
//                 <Route path="/" element={<HomeView />} />

//                 {/* Página de detalhes do Pokémon */}
//                 <Route path="/pokemon/:name" element={<PokemonDetails />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;