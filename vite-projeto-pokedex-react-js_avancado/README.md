
# Desafio Pokemon API - React

Revisão: 0.9.0

Breve descrição do propósito da aplicação;
R: Projeto final do modulo React do curso DevEmDobro, mostrar o uso do conhecimento adquirido, colocando API para funcionar no React, usar o mesmo de forma de components.

Breve descrição das funcionalidades da
aplicação entregue;
Pesquisa do nome do Pokemon acima (topo), só funciona para os pokemons exibidos (em tela), no futuro poderia ser implementada a pesquisa do norme da biblilhoteca do pokemon mesmo que ele não esteja exibido em tela;
exibe um botão para colocar ele mais claro ou escuro (dois themas);
Abaixo ele exibe inicialmente 10 pokemons e ao clicar no botão Carregar + 10 pokemons exibe outros 10 e assim por adiante;
Mostra o nome, o tipo (no futuro com o simbolo em figura), movimentos e habilidades.

Ferramentas utilizadas, e o por que estas foram
escolhidas para a realização do desafio;
1. React
Descrição: Biblioteca principal para construção da interface do usuário, criação de componentes como HomeView, NavBar, PokemonCard, etc.
2. React Router DOM
Descrição: Biblioteca para gerenciamento de rotas no React.
R: Neste eu não consegui utilizar o mesmo, não sei o motivo, mas vou entregar assim mesmo.
3. Axios
Descrição: Biblioteca para realizar requisições HTTP.
Uso: Busca de dados da API PokeAPI para carregar informações dos Pokémons.
Documentação: Axios
4. Material-UI (MUI)
R: Componentes como Grid, Button, Container, Box, e o tema dinâmico com useTheme.
5. PokeAPI
R: API pública para obter informações sobre Pokémons, para carregar detalhes como nome, imagem, tipos, movimentos e habilidades dos Pokémons.
6. Vite
R: Ferramenta que auxlia no uso do react.
7. CSS
R: Usado para estilização personalizada da pagina HTML, Arquivo home.css para estilizar a página inicial.
8. HTML
R: Components HTML inicial.
9. Skeleton Loading
R: Componente para exibir placeholders enquanto os dados estão sendo carregados, exibido durante o carregamento inicial ou ao carregar mais Pokémons.
10. Tema dinâmico com Material-UI
R: Uso do ThemeProvider e useTheme para alternar entre temas claro e escuro, alteração de cores de fundo, botões e outros elementos com base no tema.
11. Componentização
R: Uso de componentes reutilizáveis como NavBar, PokemonCard e Skeletons, organização do código em componentes modulares para facilitar a manutenção.

Decisões adotadas durante o planejamento e execução do desafio, justificando-as;
Tentei seguir a ordem inicial de como fazer o site, já que havia imaginado ter botões ao estilo de pesquisar o pokemon pelo tipo inicialmente, mas se mostrou uma grande demão e demoraria muito e não seria muito pratico sendo um projeto real, alinhei minhas expectativas para que fosse feita como um projeto real, fazer melhorias para entregar ele o mais rapido possivel e não perfeito (não feio também), mas que podera ter futuras mudanças. Andei olhando material-ui e achei interessante a forma de como ele trabalha então resolvi implementar e me desafiar também, já que não havia utilizado ele antes.
A unica coisa que me deixar chateado no momento seria com as rotas que não consegui fazer funcionar da forma que queria, a ideia inicial era exibir ele e depois que funciona-se alterar para poder clicar no pokemon e exibir mais opções dele com uma "janela"/popup com as informações com sinal de fechar, isto sem mudar a página deixando ele com SinglePage, acho que assim cumpriria o desafio a contento, mas isto ficou sem fazer.

Passo a passo dos comandos para que possamos rodar o seu projeto no nosso computador.
R:
Passo a passo para baixar as dependências e rodar o projeto em outra máquina:
1. Clone o repositório
No terminal, execute o comando para clonar o repositório do projeto:
git clone <URL_DO_REPOSITORIO>

2. Acesse o diretório do projeto
Navegue até o diretório do projeto clonado:
cd <NOME_DO_DIRETORIO>

3. Instale as dependências
Certifique-se de que você tem o Node.js instalado na máquina. Para instalar as dependências do projeto, execute:
npm install

4. Verifique o arquivo vite.config.js
Certifique-se de que o arquivo vite.config.js está configurado corretamente para lidar com rotas SPA. Ele deve conter algo assim:
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // Garante que o roteamento SPA funcione corretamente
  },
});

5. Inicie o servidor de desenvolvimento
Para rodar o projeto em modo de desenvolvimento, execute:
npm run dev

O terminal exibirá o endereço local onde o projeto está rodando, geralmente algo como:
http://localhost:5173

6. Abra o projeto no navegador
Abra o navegador e acesse o endereço exibido no terminal, como http://localhost:5173.

7. Dependências utilizadas no projeto
Certifique-se de que as seguintes dependências estão listadas no arquivo package.json e instaladas corretamente:

React: Biblioteca principal para construção da interface.
React Router DOM: Para gerenciamento de rotas.
Axios: Para realizar requisições HTTP.
Material-UI (MUI): Para componentes de interface e tema dinâmico.
Vite: Para build e servidor de desenvolvimento.
Se alguma dependência estiver faltando, instale-a manualmente. Por exemplo:
npm install react-router-dom axios @mui/material @emotion/react @emotion/styled

8. Teste o projeto
Acesse a página inicial (/) para verificar se os Pokémons estão sendo carregados.
Clique em um Pokémon para navegar para a página de detalhes (/pokemon/:name).

9. Problemas comuns
Erro de dependências: Certifique-se de que todas as dependências estão instaladas corretamente.
Erro de roteamento: Verifique se o vite.config.js está configurado para rotas SPA.
Porta em uso: Se a porta padrão (5173) estiver em uso, o Vite usará outra porta. Verifique o terminal para o endereço correto.