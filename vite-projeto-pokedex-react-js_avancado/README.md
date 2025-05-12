## Sumário

- [Pokedex React Avançado](#pokedex-react-avançado)
  - [Visão Geral](#visão-geral)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Funcionalidades Principais](#funcionalidades-principais)
  - [Como Usar](#como-usar)
    - [1. Clone o repositório](#1-clone-o-repositório)
    - [2. Instale as dependências](#2-instale-as-dependências)
    - [3. Inicie o servidor de desenvolvimento](#3-inicie-o-servidor-de-desenvolvimento)
    - [4. Execute os testes automatizados](#4-execute-os-testes-automatizados)
  - [Dicas e Solução de Problemas](#dicas-e-solução-de-problemas)
  - [Como Testar](#como-testar)
    - [Executar todos os testes](#executar-todos-os-testes)
    - [Executar apenas o teste da HomeView](#executar-apenas-o-teste-da-homeview)
  - [Screenshots](#screenshots)

# Pokedex React Avançado

## Visão Geral

Aplicação Pokedex desenvolvida em **React** com Vite, consumindo a **PokeAPI**. O projeto traz busca dinâmica por nome ou tipo, alternância de tema claro/escuro, carregamento incremental, modal de detalhes, visual consistente e testes automatizados.

---

## Tecnologias Utilizadas

-   **React**: Biblioteca principal para construção da interface.
-   **Vite**: Ferramenta de build e servidor de desenvolvimento rápido.
-   **Material UI (MUI)**: Componentes visuais modernos e responsivos.
-   **PokeAPI**: API pública para dados dos Pokémon.
-   **Jest** + **React Testing Library**: Testes automatizados de interface e lógica.
-   **Styled Components**: Estilização dinâmica dos componentes.
-   **Axios**: Requisições HTTP para a API.

---

## Funcionalidades Principais

-   **Busca por Nome ou Tipo**

    -   Seletor "Buscar por" alterna entre busca por nome (campo de texto) ou por tipo (combo box dinâmica).
    -   Combo de tipos exibe apenas tipos disponíveis dos Pokémon já carregados.
    -   Busca global: se o Pokémon não estiver carregado, é buscado na API e adicionado à lista.

-   **Tema Claro/Escuro**

    -   Alternância instantânea entre temas, afetando toda a interface.
    -   Ícone de alternância no topo da página.

-   **Carregamento Incremental**

    -   Inicialmente exibe 10 Pokémon, com botão para carregar mais 10 por vez.

-   **Detalhes em Modal**

    -   Clique em um card abre um modal com detalhes completos do Pokémon (nome, tipos, habilidades, peso, altura, movimentos, etc.), tudo em português.

-   **Skeleton Loading**

    -   Placeholders animados enquanto os dados são carregados.

-   **Visual Consistente**

    -   Campos de seleção ("Buscar por" e "Tipo") com fundo, texto e borda sempre visíveis e contrastantes em ambos os temas.

-   **Testes Automatizados**
    -   Testes com Jest e React Testing Library cobrindo renderização, busca, abertura de modal e busca global.

---

## Como Usar

### 1. Clone o repositório

```sh
git clone https://github.com/mfdzerohour/Desafio_DevEmDobro.git
cd Desafio_DevEmDobro/vite-projeto-pokedex-react-js_avancado
```

### 2. Instale as dependências

```sh
npm install
```

### 3. Inicie o servidor de desenvolvimento

```sh
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

### 4. Execute os testes automatizados

```sh
npm test
```

---

## Dicas e Solução de Problemas

-   Se a porta 5173 estiver ocupada, o Vite usará outra porta (verifique o terminal).
-   Certifique-se de que todas as dependências estão instaladas corretamente.
-   Para problemas de roteamento, confira a configuração do `vite.config.js` para SPA.

---

## Como Testar

### Executar todos os testes

```sh
npm test
```

### Executar apenas o teste da HomeView

```sh
npx jest src/pages/home/homeView.test.jsx
```

Se preferir, também pode rodar:

```sh
npm test -- src/pages/home/homeView.test.jsx
```

> Certifique-se de que as dependências estão instaladas com `npm install` antes de rodar os testes.

---

## Screenshots

![Busca por nome](./src/images/find_pokemon.png)
![Tema escuro](./src/images/desktop-screenshot.png)

---
