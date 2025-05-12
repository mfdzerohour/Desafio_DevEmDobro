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
jest.mock("../../components/NavBar/NavBar.jsx", () => () => (
    <div data-testid="navbar" />
));
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
    it("renderiza a NavBar e o botão de carregar mais pokémons", () => {
        render(<HomeView />);
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /carregar/i })
        ).toBeInTheDocument();
    });

    it("abre o modal de detalhes ao clicar em um card de Pokémon", async () => {
        axios.get.mockResolvedValueOnce({
            data: { results: [{ name: "bulbasaur", url: "url" }] },
        });
        axios.all.mockResolvedValueOnce([
            {
                name: "bulbasaur",
                types: [{ type: { name: "grass" } }],
                moves: [{ move: { name: "tackle" } }],
                abilities: [{ ability: { name: "overgrow" } }],
                sprites: {
                    other: {
                        "official-artwork": { front_default: "bulba.png" },
                    },
                },
                height: 7,
                weight: 69,
            },
        ]);
        render(<HomeView />);
        const card = await screen.findByTestId("pokemon-card");
        fireEvent.click(card);
        expect(
            await screen.findByText(/detalhes do pokémon/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    });

    it("busca um pokémon inexistente na lista e exibe na tela", async () => {
        // Simula busca por um pokémon que não está na lista
        axios.get.mockResolvedValueOnce({
            data: {
                name: "pikachu",
                sprites: { front_default: "pikachu.png" },
                types: [{ type: { name: "electric" } }],
                moves: [{ move: { name: "thunder-shock" } }],
                abilities: [{ ability: { name: "static" } }],
                height: 4,
                weight: 60,
            },
        });
        render(<HomeView />);
        await waitFor(() => {
            expect(screen.queryByText(/pikachu/i)).toBeInTheDocument();
        });
    });

    it("exibe skeletons enquanto carrega os pokémons", () => {
        render(<HomeView />);
        expect(screen.getByTestId("skeletons")).toBeInTheDocument();
    });

    it("exibe mensagem de erro ao falhar requisição", async () => {
        axios.get.mockRejectedValueOnce(new Error("Erro na API"));
        render(<HomeView />);
        await waitFor(() => {
            expect(
                screen.queryByText(/erro/i)
            ).toBeInTheDocument();
        });
    });
});
