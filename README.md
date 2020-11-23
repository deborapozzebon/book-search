[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

# Book search

## Tabela de conteúdo

<!--ts-->
   * [Sobre o projeto](#sobre-o-projeto)
      * [Funcionalidades](#funcionalidades)
      * [Construído com](#construído-com)
      * [Requisitos](#requisitos)
      * [Instalação](#instalação)
   * [Testes](#testes)
   * [Autora](#autora)
<!--te-->

## Sobre o projeto

Através desta aplicação é possível consultar o conteúdo da API Books do Google. Informe uma palavra chave e encontre livros relacionados. Ao clicar em cada uma das imagens dos livros, é possível ter uma descrição completa do livro e seu título. Caso deseje, é possível adicionar este livro aos favoritos. Estando no contexto dos livros favoritos, é possível remover os livros desta lista.

### Funcionalidades
#### Pesquisar por livros
![Pesquisar](https://user-images.githubusercontent.com/29635702/99922416-43315d00-2d0f-11eb-8d12-0adcedd39f3c.png)

#### Visualizar descrição e título do livro + Adicionar aos favoritos
![adicionar-favoritos](https://user-images.githubusercontent.com/29635702/99922419-462c4d80-2d0f-11eb-9c02-f613d8eee2a4.png)

#### Visualizar livros favoritos + Remover livro dos favoritos
![remover-favoritos](https://user-images.githubusercontent.com/29635702/99922420-475d7a80-2d0f-11eb-928b-fc21d9cd95ff.png)


### Construído com 

* ReactJS
* Bootstrap

### Requisitos

* Node
* Npm
```sh
npm install npm@latest -g
```

### Instalação

1. Criar uma credencial de chave de API para ter acesso aos livros da api do google. Para isso: 

2. Acesse: https://console.developers.google.com/apis/library/books.googleapis.com?q=Books&id=2027a432-a940-4665-830e-313e62a311f4&project=steel-watch-295920

3. Clique em Gerenciar.

4. Na lateral esquerda, clique em Credenciais. 

5. Na tela de credenciais, clique em + CRIAR CREDENCIAIS e selecione e a opção Chave de API.

6. Clone este repositório;
```sh
git clone https://github.com/your_username_/Project-Name.git
```
7. Entre na pasta do projeto
```sh
cd book-search
```
8. Instale os pacotes do NPM
```sh
npm install
```
9. Na tela de Chave de API nas credenciais de API, copie a chave disponibilizada. Acesse o arquivo: https://github.com/deborapozzebon/book-search/blob/main/src/components/main/main.js e troque o valor da variável APIKEY para o valor obtido após os passos 1 ao 5.

10. Faça o Build da aplicação
```sh
npm run-script build
```
11. Inicie e aplicação
```sh
npm start
```

## Testes

Para executar os testes unitários, utilize o seguinte comando:
```sh
npm test
```

## Autora

<a href="https://github.com/deborapozzebon">
 <img style="border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/29635702?s=400&u=e61d4957236b1836cbf16b13d3851e41abea3eb1&v=4" width="100px;" alt=""/>
 <br />
</a>

Feito com ❤️ por Debora Pozzebon!

[![Linkedin Badge](https://img.shields.io/badge/-Debora-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/d%C3%A9bora-pozzebon-b9883194)](https://www.linkedin.com/in/d%C3%A9bora-pozzebon-b9883194) 
[![Gmail Badge](https://img.shields.io/badge/-debora.pozzebon@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:debora.pozzebon@gmail.com)](mailto:debora.pozzebon@gmail.com)

