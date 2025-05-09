# Desafio Pokemon API - React

**Revisão:** 1.1.0

## Propósito da Aplicação

Projeto final do módulo React do curso DevEmDobro. O objetivo é demonstrar o uso de React moderno, consumo de API, componentização, estilização e testes automatizados.

## Funcionalidades

- **Busca por Nome ou Tipo:**
  - No topo, é possível pesquisar Pokémon pelo nome (campo de texto) ou pelo tipo (combo box dinâmica).
  - O modo de busca pode ser alternado por um seletor ao lado do campo de busca.
  - A lista de tipos exibidos na combo é dinâmica, mostrando apenas os tipos dos Pokémon já carregados na tela.
- **Tema Claro/Escuro:**
  - Botão para alternar entre tema claro e escuro, afetando toda a interface.
- **Listagem Dinâmica:**
  - Inicialmente exibe 10 Pokémon.
  - Botão para carregar mais 10 Pokémon por vez.
- **Exibição de Detalhes em Pop-up:**
  - Ao clicar em um card de Pokémon, um pop-up (modal) é aberto exibindo detalhes como nome, tipos, habilidades e movimentos do Pokémon selecionado.
- **Skeleton Loading:**
  - Exibe placeholders enquanto os dados estão sendo carregados.
- **Testes Automatizados:**
  - Testes unitários com Jest e React Testing Library para garantir o funcionamento dos principais fluxos, incluindo a abertura do modal de detalhes.

## Ferramentas Utilizadas

- **React:** Biblioteca principal para construção da interface do usuário.
- **React Router DOM:** Gerenciamento de rotas (estrutura pronta para detalhes de Pokémon).
- **Axios:** Requisições HTTP para a PokeAPI.
- **Material-UI (MUI):** Componentes visuais, Grid, Button, Container, Box, tema dinâmico, Dialog (modal).
- **PokeAPI:** API pública para obter informações dos Pokémon.
- **Vite:** Ferramenta de build e desenvolvimento rápido.
- **Jest + React Testing Library:** Testes automatizados de componentes e fluxos.
- **CSS:** Estilização personalizada (home.css).

## Decisões de Projeto

- O filtro por tipo foi implementado com uma combo box dinâmica, tornando a busca mais intuitiva.
- O modo de busca pode ser alternado facilmente, melhorando a experiência do usuário.
- O modal de detalhes permite visualizar rapidamente informações do Pokémon sem sair da tela principal.
- O projeto está pronto para expansão, como busca global na PokeAPI ou exibição de detalhes em modal.
- Testes automatizados garantem maior confiabilidade e facilitam futuras manutenções.

## Como Rodar o Projeto

### 1. Clone o repositório

```sh
# Clone o repositório e acesse a pasta do projeto
https://github.com/mfdzerohour/Desafio_DevEmDobro
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

### 5. Problemas comuns

- **Erro de dependências:** Certifique-se de que todas as dependências estão instaladas corretamente.
- **Erro de roteamento:** Verifique se o vite.config.js está configurado para rotas SPA.
- **Porta em uso:** Se a porta padrão (5173) estiver em uso, o Vite usará outra porta. Verifique o terminal para o endereço correto.

## Screenshots

![Busca por nome](./src/images/find_pokemon.png)
![Tema escuro](./src/images/desktop-screenshot.png)

---

Projeto desenvolvido para fins educacionais no curso DevEmDobro.