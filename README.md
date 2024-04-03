# Desafio Huggy
Este é o repositório do Desafio Huggy, que consiste em um frontend Vue.js que consome as rotas de uma API Laravel. O projeto utiliza um banco de dados MySQL.

## Como Usar
A seguir, detalharemos os passos necessários para configurar e utilizar o projeto:

## Clonando o Repositório
Para clonar este repositório, execute o seguinte comando em seu terminal:

git clone [https://github.com/kareninakvam/desafio-huggy.git]

## Configurando o Backend (API Laravel)
Navegue até o diretório desafio-huggy:

cd desafio-huggy

Instale as dependências do Laravel utilizando o Composer:

composer install

Crie um arquivo de ambiente .env a partir do arquivo .env.example:

cp .env.example .env

Configure as variáveis de ambiente no arquivo .env, incluindo as informações de conexão com o banco de dados MySQL.

Gere a chave de aplicativo do Laravel:

php artisan key:generate

Execute as migrações do banco de dados para criar as tabelas necessárias:

php artisan migrate

Inicie o servidor da API Laravel:

php artisan serve

## Configurando o Frontend (Vue.js)

Navegue até o diretório frontend:

cd frontend

Instale as dependências do Vue.js utilizando o npm:

npm install

Inicie o servidor de desenvolvimento do Vue.js:

npm run serve

## Utilizando o Projeto

Após seguir os passos acima, você poderá acessar o frontend Vue.js em http://localhost:8080 e a API Laravel em http://localhost:8000. Certifique-se de que ambos os servidores estejam em execução simultaneamente para o correto funcionamento do projeto.

Obs: Caso use outra porta para a API, será necessário alterar as chamadas de API no frontend.


Link para a documentação da API no postman: https://documenter.getpostman.com/view/18335886/2sA35HY24C
