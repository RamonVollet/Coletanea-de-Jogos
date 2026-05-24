# Coletanea-de-Jogos
Este projeto foi desenvolvido para organizar coleções dos colecionadores amantes de mídias/digitai de jogos por console

# Colecao Games

Este projeto foi desenvolvido para os amantes e colecionadores de jogos tanto mídia física/digital a organizar uma colecao 
de jogos baseada por console, com cadastro, edicao, exclusao e visualizacao em uma interface tematica

## Sobre o projeto

O projeto foi desenvolvido em HTML, CSS, JavaScript e PHP, usando arquivos JSON como armazenamento local. Cada console tem sua propria base de dados e seu proprio tema visual.

## Funcionalidades

- Cadastro de jogos com nome, categoria, link de compra e capa
- Edicao e exclusao de jogos
- Separacao por console: Xbox, PlayStation e Nintendo
- Temas visuais alterados automaticamente conforme o console ativo
- Busca em tempo real por nome do jogo
- Visualizacao ampliada da capa em modal
- Cards organizados por categoria
- Arrastar e soltar com SortableJS
- Persistencia em arquivos JSON separados por console

## Categorias

- Preco Salgado
- Compras futuras
- Ta na conta

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- PHP
- JSON
- SortableJS

## Estrutura do projeto

```text
colecao_games/
|-- index.html
|-- adicao.html
|-- css/
|   `-- style.css
|-- js/
|   `-- script.js
|-- php/
|   `-- api.php
|-- json/
|   |-- xbox.json
|   |-- playstation.json
|   `-- nintendo.json
`-- images/
```

## Como executar

1. Copie a pasta do projeto para o diretorio do XAMPP, por exemplo `C:\xampp\htdocs\colecao_games`.
2. Inicie o Apache no XAMPP.
3. Acesse no navegador:

```text
http://localhost/colecao_games/index.html
```

## API

O arquivo `php/api.php` atende os metodos abaixo:

- `GET` para listar os jogos do console atual
- `POST` para adicionar um jogo
- `PUT` para atualizar um jogo existente
- `DELETE` para remover um jogo

Exemplo de parametro de console:

```text
?console=xbox
?console=playstation
?console=nintendo
```

Se um console invalido for informado, o sistema usa `xbox` por padrao.

## Observacoes

- Cada console usa um arquivo JSON separado.
- O sistema nao depende de banco de dados SQL.
- E necessario permissao de escrita na pasta `json/`.
- O CDN do SortableJS requer acesso a internet.

## Licenca

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

## Autor

👾 Ramon Buzutti Vollet 👾
