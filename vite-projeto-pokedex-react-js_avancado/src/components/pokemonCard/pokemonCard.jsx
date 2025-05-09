import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Importa o hook useTheme
import axios from "axios";

export default function PokemonCard({ name, image, types, moves, abilities, labelTypes = "Tipos", labelMoves = "Movimentos", labelAbilities = "Habilidades" }) {
    const [abilityDetails, setAbilityDetails] = React.useState([]);
    const theme = useTheme(); // Acessa o tema atual

    React.useEffect(() => {
        const fetchAbilityDetails = async () => {
            if (!abilities || abilities.length === 0) {
                console.log("No abilities found for this Pokémon.");
                return;
            }

            const abilityPromises = abilities.map((ability) =>
                axios.get(ability.ability.url).then((res) => ({
                    name: ability.ability.name,
                    description:
                        res.data.effect_entries.find(
                            (entry) => entry.language.name === "en"
                        )?.effect || "No description available",
                }))
            );

            try {
                const resolvedAbilities = await Promise.all(abilityPromises);
                setAbilityDetails(resolvedAbilities);
            } catch (error) {
                console.error("Error fetching ability details:", error);
            }
        };

        fetchAbilityDetails();
    }, [abilities]);

    const typeHandler = (types) => {
        if (types && types[1]) {
            return types[0].type.name + " | " + types[1].type.name;
        }
        return types && types[0] ? types[0].type.name : "Unknown";
    };

    const moveHandler = (moves) => {
        if (!moves || moves.length === 0) {
            return "No moves available";
        }
        return moves
            .slice(0, 5)
            .map((move) => move.move.name)
            .join(", ");
    };

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%", // Garante que o cartão ocupe toda a altura disponível
                backgroundColor: "#ffffff", // Cor fixa para o fundo do card
                color: "#000000", // Cor fixa para o texto
                border: "1px solid #e0e0e0", // Borda fixa
                borderRadius: "8px", // Bordas arredondadas
                boxShadow: theme.palette.mode === "dark"
                    ? "0px 4px 8px rgba(255, 255, 255, 0.2)" // Sombra clara no tema escuro
                    : "0px 4px 8px rgba(0, 0, 0, 0.2)", // Sombra escura no tema claro
                transition: "box-shadow 0.3s ease-in-out", // Transição suave para hover
                "&:hover": {
                    boxShadow: theme.palette.mode === "dark"
                        ? "0px 8px 16px rgba(27, 221, 227, 0.493)" // Sombra clara mais forte no tema escuro
                        : "0px 8px 16px rgba(0, 0, 0, 0.3)", // Sombra escura mais forte no tema claro
                },
            }}
        >
            <CardMedia
                sx={{
                    height: 200,
                    objectFit: "contain",
                    width: "100%",
                    backgroundColor: "#f5f5f5", // Fundo fixo para a imagem
                }}
                image={image}
                title={name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div">
                        {labelTypes}: {typeHandler(types)}
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    sx={{ mb: 1, color: "#757575" }} // Cor fixa para o texto secundário
                >
                    <strong>{labelMoves}:</strong> {moveHandler(moves)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#757575" }}>
                    <strong>{labelAbilities}:</strong>
                </Typography>
                {abilityDetails.length > 0 ? (
                    abilityDetails.map((ability, index) => (
                        <Typography
                            key={index}
                            variant="body2"
                            sx={{ mb: 1, color: "#757575" }}
                        >
                            <strong>{ability.name}:</strong>{" "}
                            {ability.description}
                        </Typography>
                    ))
                ) : (
                    <Typography variant="body2" sx={{ color: "#757575" }}>
                        Nenhuma habilidade disponível.
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

// IMPLEMENTANDO A ROTA COMO DEVERIA FICAR MAS NÂO FUNCIONA
// import React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { Box } from "@mui/material";
// import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate

// export default function PokemonCard({ name, image, types }) {
//     const navigate = useNavigate(); // Hook para navegação

//     const handleCardClick = () => {
//         navigate(`/pokemon/${name}`); // Navega para a rota do Pokémon
//     };

//     return (
//         <Card
//             onClick={handleCardClick} // Adiciona o evento de clique
//             sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 height: "100%",
//                 backgroundColor: "#ffffff",
//                 color: "#000000",
//                 border: "1px solid #e0e0e0",
//                 borderRadius: "8px",
//                 boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//                 transition: "box-shadow 0.3s ease-in-out",
//                 "&:hover": {
//                     boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
//                     cursor: "pointer",
//                 },
//             }}
//         >
//             <CardMedia
//                 sx={{
//                     height: 200,
//                     objectFit: "contain",
//                     width: "100%",
//                     backgroundColor: "#f5f5f5",
//                 }}
//                 image={image}
//                 title={name}
//             />
//             <CardContent sx={{ flexGrow: 1 }}>
//                 <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                 >
//                     <Typography gutterBottom variant="h5" component="div">
//                         {name}
//                     </Typography>
//                     <Typography gutterBottom variant="caption" component="div">
//                         {types.map((type) => type.type.name).join(", ")}
//                     </Typography>
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// }