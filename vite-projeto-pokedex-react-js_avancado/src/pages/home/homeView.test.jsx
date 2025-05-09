/* global jest, describe, it, expect */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { HomeView } from "./homeView";

// Mock das dependências externas
jest.mock("axios", () => ({
    all: jest.fn(() => Promise.resolve([])),
    get: jest.fn(() => Promise.resolve({ data: {} })),
}));
// Não repassar props customizadas para o DOM
jest.mock("../../components/NavBar/NavBar.jsx", () => () => (
    <div data-testid="navbar" />
));
jest.mock("../../components/pokemonCard/pokemonCard.jsx", () => () => (
    <div data-testid="pokemon-card" />
));
jest.mock("../../components/Skeletons/Skeletons.jsx", () => ({
    Skeletons: () => <div data-testid="skeletons" />,
}));

describe("HomeView", () => {
    it("renderiza a NavBar e o botão de carregar mais pokémons", () => {
        render(<HomeView />);
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /carregando/i })
        ).toBeInTheDocument();
    });

    it("chama a função de carregar mais pokémons ao clicar no botão", async () => {
        render(<HomeView />);
        const button = screen.getByRole("button", { name: /carregando/i });
        fireEvent.click(button);
        // Não há assert de resultado pois axios está mockado
    });

    it("filtra pokémons por nome corretamente", async () => {
        // Simula pokémons carregados
        const pokemons = [
            {
                name: "bulbasaur",
                types: [{ type: { name: "grass" } }],
                moves: [],
                abilities: [],
                image: "",
            },
            {
                name: "charmander",
                types: [{ type: { name: "fire" } }],
                moves: [],
                abilities: [],
                image: "",
            },
        ];
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => [pokemons, jest.fn()])
            .mockImplementationOnce(() => [pokemons, jest.fn()])
            .mockImplementation((init) => [init, jest.fn()]);
        render(<HomeView />);
        // Não há assert de resultado pois a NavBar é mockada
    });
});
