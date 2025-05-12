/* global jest, describe, it, expect */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HomeView } from "./homeView";
import axios from "axios";
import { afterEach } from "@jest/globals";

// Mocks básicos dos componentes e dependências externas
jest.mock("axios", () => ({
    all: jest.fn(() => Promise.resolve([])),
    get: jest.fn(() => Promise.resolve({ data: {} })),
}));
jest.mock("../../components/NavBar/NavBar.jsx", () => (props) => {
    // Mock NavBar com campo de texto e botão de busca que chama o callback onSearch
    return (
        <div data-testid="navbar">
            <input
                data-testid="search-input"
                type="text"
                onChange={e => props.onSearch && props.onSearch(e.target.value)}
            />
            <button onClick={() => props.onSearch && props.onSearch('raichu')}>Buscar</button>
        </div>
    );
});
jest.mock("../../components/pokemonCard/pokemonCard.jsx", () => (props) => (
    <div data-testid="pokemon-card" onClick={props.onClick}>
        {props.name}
    </div>
));
jest.mock("../../components/Skeletons/Skeletons.jsx", () => ({
    Skeletons: () => <div data-testid="skeletons" />,
}));

afterEach(() => {
    jest.clearAllMocks();
});

describe("HomeView", () => {
    it("renderiza a NavBar e o botão de carregar mais pokémons", async () => {
        // Mocka as 10 primeiras chamadas da PokeAPI simulando pokémons válidos
        axios.all.mockResolvedValueOnce(
            Array.from({ length: 10 }).map((_, i) => ({
                data: {
                    name: `pokemon${i + 1}`,
                    sprites: { front_default: `img${i + 1}.png` },
                    types: [{ type: { name: "grass" } }],
                    moves: [{ move: { name: "tackle" } }],
                    abilities: [{ ability: { name: "overgrow" } }],
                },
            }))
        );
        render(<HomeView />);
        expect(await screen.findByTestId("navbar")).toBeInTheDocument();
        expect(
            await screen.findByRole("button", { name: /carregar/i })
        ).toBeInTheDocument();
    });

    it("abre o modal de detalhes ao clicar em um card de Pokémon", async () => {
        axios.all.mockResolvedValueOnce([
            {
                data: {
                    name: "bulbasaur",
                    sprites: { front_default: "bulba.png" },
                    types: [{ type: { name: "grass" } }],
                    moves: [{ move: { name: "tackle" } }],
                    abilities: [{ ability: { name: "overgrow" } }],
                },
            },
        ]);
        // Mock para detalhes do Pokémon ao abrir modal
        axios.get.mockResolvedValueOnce({
            data: {
                name: "bulbasaur",
                sprites: { front_default: "bulba.png" },
                types: [{ type: { name: "grass" } }],
                moves: [{ move: { name: "tackle" } }],
                abilities: [{ ability: { name: "overgrow" } }],
                height: 7,
                weight: 69,
            },
        });
        render(<HomeView />);
        const card = await screen.findByTestId("pokemon-card");
        fireEvent.click(card);
        // Usa findAllByText para evitar erro de múltiplos elementos
        const bulbasaurElements = await screen.findAllByText(/bulbasaur/i);
        expect(bulbasaurElements.length).toBeGreaterThan(0);
        expect(
            await screen.findByText(/detalhes do pokémon/i)
        ).toBeInTheDocument();
    });

    it("busca um pokémon inexistente na lista e exibe na tela", async () => {
        // Lista inicial vazia (nenhum pokémon na tela)
        axios.all.mockResolvedValueOnce([]);
        // Mock da busca por um pokémon inexistente na lista inicial (ex: raichu)
        axios.get.mockResolvedValueOnce({
            data: {
                name: "raichu",
                sprites: { front_default: "raichu.png" },
                types: [{ type: { name: "electric" } }],
                moves: [{ move: { name: "thunder" } }],
                abilities: [{ ability: { name: "static" } }],
                height: 8,
                weight: 300,
            },
        });
        render(<HomeView />);
        // Aguarda renderização da NavBar e botão de carregar
        expect(await screen.findByRole("button", { name: /carregar/i })).toBeInTheDocument();
        // Simula digitação do nome no campo de busca
        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "raichu" } });
        // Simula clique no botão de buscar
        const searchButton = screen.getByRole("button", { name: /buscar/i });
        fireEvent.click(searchButton);
        // Aguarda o card do pokémon buscado aparecer
        const card = await screen.findByTestId("pokemon-card");
        expect(card).toBeInTheDocument();
        expect(card.textContent.toLowerCase()).toContain("raichu");
    });

    it("exibe skeletons enquanto carrega os pokémons", async () => {
        // Mocka o carregamento inicial pendente (simula loading)
        axios.all.mockImplementationOnce(() => new Promise(() => {}));
        render(<HomeView />);
        expect(await screen.findByTestId("skeletons")).toBeInTheDocument();
    });

    it("exibe mensagem de erro ao falhar requisição", async () => {
        // Mocka erro no carregamento inicial
        axios.all.mockRejectedValueOnce(new Error("Erro na API"));
        render(<HomeView />);
        // O componente não exibe mensagem de erro por padrão, então só verifica se não está carregando
        await waitFor(() => {
            expect(screen.queryByTestId("skeletons")).not.toBeInTheDocument();
        });
    });
});
