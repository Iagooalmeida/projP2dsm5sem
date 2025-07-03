# API Pokédex FATEC DSM - Node.js

## 📋 Descrição

API REST desenvolvida em Node.js com Express e MySQL para o projeto Pokédex da FATEC DSM.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL** - Banco de dados relacional
- **mysql2** - Driver MySQL para Node.js
- **CORS** - Habilitação de requisições cross-origin
- **dotenv** - Gerenciamento de variáveis de ambiente

## ⚙️ Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Banco de Dados

1. Certifique-se de que o MySQL está rodando na sua máquina
2. Abra o MySQL Workbench
3. Crie uma conexão para `localhost:3306` com usuário `root`
4. Edite o arquivo `.env` com suas credenciais:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=pokedex_fatec
DB_PORT=3306
PORT=3000
```

### 3. Configurar Banco de Dados Automaticamente

```bash
npm run setup
```

Este comando irá:
- Criar o banco de dados `pokedex_fatec`
- Criar as tabelas `usuarios` e `pokemons`
- Inserir dados iniciais (usuário padrão + 10 pokémons)

## 🎯 Como Executar

### Modo Desenvolvimento (com auto-reload)

```bash
npm run dev
```

### Modo Produção

```bash
npm start
```

A API estará disponível em: `http://localhost:3000`

## 📚 Endpoints da API

### 🏠 Página Principal

- **GET** `/` - Documentação da API

### 👤 Usuários

- **POST** `/api/login` - Fazer login
- **POST** `/api/usuarios` - Cadastrar usuário
- **GET** `/api/usuarios` - Listar usuários

### 🐾 Pokémons

- **GET** `/api/pokemons` - Listar todos os pokémons
- **GET** `/api/pokemons/:id` - Buscar pokémon por ID
- **POST** `/api/pokemons` - Adicionar novo pokémon

### 🔄 Sincronização (Compatibilidade com PHP)

- **POST** `/api/sync_user` - Sincronizar usuário do SQLite
- **POST** `/api/sync_pokemon` - Sincronizar pokémon do SQLite

## 📝 Exemplos de Uso

### Login

```javascript
// POST /api/login
{
  "email": "fatec@pokemon.com",
  "senha": "pikachu"
}
```

### Cadastrar Usuário

```javascript
// POST /api/usuarios
{
  "email": "novo@usuario.com",
  "senha": "minhasenha"
}
```

### Adicionar Pokémon

```javascript
// POST /api/pokemons
{
  "id": 25,
  "nome": "Pikachu",
  "tipo": "Electric",
  "imagem": "pikachu.png"
}
```

## 🗄️ Estrutura do Banco de Dados

### Tabela `usuarios`

```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela `pokemons`

```sql
CREATE TABLE pokemons (
  id INT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  tipo VARCHAR(255) NOT NULL,
  imagem VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Integração com Flutter

Para usar esta API no seu app Flutter, atualize as URLs no `database_helper.dart`:

```dart
// Substituir:
Uri.parse('https://url-do-servidor.com/api/sync_user.php')
// Por:
Uri.parse('http://localhost:3000/api/sync_user')

// Substituir:
Uri.parse('https://url-do-servidor.com/api/sync_pokemon.php')
// Por:
Uri.parse('http://localhost:3000/api/sync_pokemon')
```

## 🎯 Dados Iniciais

### Usuário Padrão

- **Email:** fatec@pokemon.com
- **Senha:** pikachu

### Pokémons Pré-cadastrados

1. Bulbasaur (Grass/Poison)
2. Ivysaur (Grass/Poison)
3. Venusaur (Grass/Poison)
4. Charmander (Fire)
5. Charmeleon (Fire)
6. Charizard (Fire/Flying)
7. Squirtle (Water)
8. Wartortle (Water)
9. Blastoise (Water)
10. Caterpie (Bug)

## 🚦 Status da API

Acesse `http://localhost:3000` para ver o status da API e a documentação completa dos endpoints.

## 🐛 Resolução de Problemas

### Erro de Conexão com MySQL

1. Verifique se o MySQL está rodando
2. Confirme usuário e senha no arquivo `.env`
3. Certifique-se de que a porta 3306 está disponível

### Erro "Database does not exist"

Execute: `npm run setup` para criar o banco automaticamente

### Porta já em uso

Altere a porta no arquivo `.env` ou pare o processo que está usando a porta 3000
