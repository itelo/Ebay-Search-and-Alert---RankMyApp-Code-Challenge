# Ebay Search and Alert - RankMyApp Code Challenge

Para realizar este projeto eu utilizei o React, Mongo, Node e Typescript. Para agilizar o desevolvimento escolhi usar o [create-react-app](https://github.com/facebook/create-react-app) e [TypeScript-Node-Starter](https://github.com/microsoft/TypeScript-Node-Starter), para o frontend e backend respectivamente.

## API

| route                    | verb   | description                      |
| ------------------------ | ------ | -------------------------------- |
| /api/query?searchPhrase= | GET    | query for products in ebay       |
| /api/list                | GET    | get the jobs schedules in agenda |
| /api/register            | POST   | save a new job to agenda         |
| /api/cancel/:id          | DELETE | delete a job in agenda           |

## Arvore de diretorios

Coloqueis os dois projetos no mesmo repositorio, deixando como na arvore abaixo:

```bash
.
├── frontend
├── server
```

No modo de desenvolvimento é preciso baixar tudo, entrar no projeto e rodar os comandos:

`yarn && yarn start`

felizmente para a produção podemos ir para a root do projeto e apenas rodar o comando do docker componete na raiz do projeto

`docker-compose up`

obs: no docker, ele 'compila' o frontend, gerando uma pasta build, eu pego essa pasta build e coloco na raiz da pasta do server como public (dessa forma o servidor consegue ver e enviar os arquivos para o browser).

## libs que me ajudaram a desenvolver o projeto

#### [Agenda - Lightweight job scheduling for Node.js](https://github.com/agenda/agenda)

Utilizei a lib agenda para gerenciar o envio de email durante os intervalos.

#### [Material-UI - React components for faster and easier web development. Build your own design system, or start with Material Design.](https://github.com/mui-org/material-ui/)

Utilizei a lib para me ajudar a contruir a interface em React.

## dificuldades encontradas

- Tentei utilizar uma lib em node que teoricamente ja fazia o trabalho pesado... No fim ela era bastante incompleta e acabei tendo que fazer uma função que resolveu o meu problema.
- Fazia tempo que não trabalhava com docker, isso acabou tomando um pouco de tempo, mas no final deu tudo certo

## tests

Escrevi os testes utilizando o jest

#### frontend

#### backend
