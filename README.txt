==============================================================================
  COLECAO_GAMES - COLECAO DE JOGOS
==============================================================================

Este projeto foi desenvolvido para organizar colecoes de jogos por console,
com visual tematico e persistencia local em JSON via PHP.
Versao: 1.0

==============================================================================
SOBRE O PROJETO
==============================================================================

Sistema web para cadastro, edicao, exclusao e visualizacao de jogos,
separados por categorias e por console (Xbox, PlayStation e Nintendo).
A interface altera tema, logo e detalhes visuais automaticamente conforme
o console ativo.

==============================================================================
FUNCIONALIDADES PRINCIPAIS
==============================================================================

GESTAO DE JOGOS:
- Cadastro de jogo com nome, categoria, link de compra e capa
- Edicao de jogo existente
- Exclusao de jogo com confirmacao
- Persistencia em arquivo JSON por console

ORGANIZACAO POR CATEGORIA:
- Preco Salgado
- Compras futuras
- Ta na conta
- Renderizacao em cards com acoes de editar/excluir

MULTI-CONSOLE:
- Botao para alternar console
- Temas dedicados por console:
  - Xbox (verde)
  - PlayStation (azul)
  - Nintendo (vermelho)
- Logo e links atualizados automaticamente
- Dados separados em arquivos diferentes (um JSON por console)

EXPERIENCIA E INTERACAO:
- Busca em tempo real por nome do jogo
- Modal de capa ao dar duplo clique no card
- Scroll horizontal por setas em cada categoria
- Arrastar e soltar cards com SortableJS
- Favicon padrao com icone de controle de videogame
- Scrollbar global com cor dinamica por tema

PERFORMANCE:
- Renderizacao em lotes (chunked rendering)
- Lazy loading de imagens
- Decoding assincrono das capas

==============================================================================
COMO O SISTEMA FUNCIONA
==============================================================================

FLUXO GERAL:
1. O usuario abre index.html.
2. O sistema identifica o console atual por parametro de URL ou localStorage.
3. O frontend chama php/api.php?console=<consoleAtual>.
4. O backend le/grava o arquivo json/<console>.json.
5. A tela renderiza os cards por categoria.

CADASTRO E EDICAO:
- A pagina adicao.html e usada para inserir e atualizar jogos.
- Ao editar, o indice do jogo e armazenado em localStorage por console.
- Se nao houver nova imagem no formulario, a capa anterior e mantida.

ARMAZENAMENTO:
- Cada console salva seus dados em arquivo separado:
  - json/xbox.json
  - json/playstation.json
  - json/nintendo.json
- O backend cria arquivo vazio ([]) automaticamente quando necessario.

==============================================================================
ESTRUTURA DO PROJETO
==============================================================================

/colecao_games/
|
|-- index.html                         -> Pagina principal da colecao
|-- adicao.html                        -> Pagina de cadastro/edicao
|-- README.txt                         -> Documentacao principal do sistema
|-- README_referencia.txt              -> Arquivo base de referencia de estilo
|
|-- css/
|   |-- style.css                      -> Estilos globais e temas por console
|
|-- js/
|   |-- script.js                      -> Logica de UI, console e CRUD
|
|-- php/
|   |-- api.php                        -> API REST simples para JSON
|
|-- json/
|   |-- xbox.json                      -> Base de jogos Xbox
|   |-- playstation.json               -> Base de jogos PlayStation
|   |-- nintendo.json                  -> Base de jogos Nintendo
|
`-- images/
    |-- controle-de-video-game.png     -> Favicon do site
    |-- xbox.png                       -> Logo Xbox
    |-- PlayStation_logo_and_wordmark.svg -> Logo PlayStation
    `-- Nintendo_red_logo.svg.png      -> Logo Nintendo

==============================================================================
API (php/api.php)
==============================================================================

METODOS SUPORTADOS:
- GET    -> Lista jogos do console atual
- POST   -> Adiciona jogo
- PUT    -> Atualiza jogo por indice
- DELETE -> Remove jogo por indice

PARAMETRO DE CONSOLE:
- ?console=xbox
- ?console=playstation
- ?console=nintendo

OBSERVACAO:
- Se um console invalido for informado, o sistema usa xbox por padrao.

==============================================================================
TECNOLOGIAS UTILIZADAS
==============================================================================

FRONTEND:
- HTML5
- CSS3 (temas, animacoes e responsividade)
- JavaScript (ES6+)
- SortableJS (arrastar e soltar cards)

BACKEND:
- PHP (sem framework)
- JSON como banco local

==============================================================================
REQUISITOS
==============================================================================

SERVIDOR:
- Apache/Nginx com PHP 7.0+
- Permissao de escrita na pasta json/

CLIENTE:
- Navegador moderno com JavaScript habilitado
- Conexao com internet para CDN do SortableJS

==============================================================================
INSTALACAO E USO
==============================================================================

1. Coloque a pasta colecao_games em:
  C:\xampp\htdocs\colecao_games\

2. Inicie o Apache no XAMPP.

3. Acesse no navegador:
  http://localhost/colecao_games/index.html

4. Use o botao "Trocar Console" para alternar tema e base de dados.

==============================================================================
NOTAS IMPORTANTES
==============================================================================

- Cada console possui seu proprio arquivo JSON.
- O tema visual e aplicado por classe no body (console-xbox,
  console-playstation, console-nintendo).
- O sistema nao usa banco SQL; toda persistencia e local em JSON.
- Para refletir mudancas de icone da aba rapidamente, use Ctrl+F5.

==============================================================================
MELHORIAS FUTURAS SUGERIDAS
==============================================================================

- Exportacao/importacao de colecao (JSON)
- Filtro por categoria e status combinado com busca
- Paginacao opcional para colecoes muito grandes
- Upload de imagem para pasta local (em vez de base64)
- Backup automatico dos JSONs
- Autenticacao de usuario

================================================================================
LICENÇA
================================================================================

Projeto open source para lazer, uso e modificacao, desde que os creditos do projeto sejam mantidos.

Este projeto nao possui qualquer afiliacao oficial com Nintendo, Sony ou Microsoft.
Todos os nomes, marcas, logos e imagens relacionadas a consoles e franquias citadas
sao propriedades de seus respectivos donos e sao usados aqui apenas para fins
de demonstracao, estudo e organizacao pessoal.

Creditos de marca e propriedade intelectual:
- Nintendo e Nintendo Switch sao marcas registradas da Nintendo.
- PlayStation e os elementos visuais relacionados sao de propriedade da Sony Interactive Entertainment.
- Xbox e os elementos visuais relacionados sao de propriedade da Microsoft.

Se algum detentor de direitos solicitar a retirada de material especifico, ele pode
ser removido imediatamente.

================================================================================
SUPORTE E CONTRIBUIÇÕES
================================================================================

Para relatar bugs, sugestões ou contribuições:
- Abra uma issue no repositório do projeto
- Descreva o problema/sugestão detalhadamente
- Inclua prints ou exemplos se possível

Agradeço por usar meu sistema!
================================================================================
👾 produzido e disponibilizado por Ramon Buzutti Vollet 👾
================================================================================