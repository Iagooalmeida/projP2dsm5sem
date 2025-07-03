const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'pokedex_fatec',
    port: process.env.DB_PORT || 3306
};

// Função para criar conexão com o banco
async function createConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Conectado ao MySQL!');
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error);
        throw error;
    }
}

// Função para criar o banco de dados se não existir
async function createDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            port: dbConfig.port
        });

        await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        console.log(`Banco de dados '${dbConfig.database}' criado/verificado!`);
        await connection.end();
    } catch (error) {
        console.error('Erro ao criar banco de dados:', error);
        throw error;
    }
}

// Função para criar as tabelas
async function createTables() {
    try {
        const connection = await createConnection();

        // Tabela usuarios
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabela pokemons
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS pokemons (
                id INT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                tipo VARCHAR(255) NOT NULL,
                imagem VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Tabelas criadas com sucesso!');
        await connection.end();
    } catch (error) {
        console.error('Erro ao criar tabelas:', error);
        throw error;
    }
}

// Função para popular o banco com dados iniciais
async function seedDatabase() {
    try {
        const connection = await createConnection();

        // Inserir usuário padrão (se não existir)
        const [userExists] = await connection.execute(
            'SELECT COUNT(*) as count FROM usuarios WHERE email = ?',
            ['fatec@pokemon.com']
        );

        if (userExists[0].count === 0) {
            await connection.execute(
                'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
                ['fatec@pokemon.com', 'pikachu']
            );
            console.log('Usuário padrão inserido!');
        }

        // Inserir pokémons (se não existirem)
        const [pokemonExists] = await connection.execute('SELECT COUNT(*) as count FROM pokemons');

        if (pokemonExists[0].count === 0) {
            const pokemons = [
                { id: 1, nome: 'Bulbasaur', tipo: 'Grass/Poison', imagem: 'bulbasaur.png' },
                { id: 2, nome: 'Ivysaur', tipo: 'Grass/Poison', imagem: 'ivysaur.png' },
                { id: 3, nome: 'Venusaur', tipo: 'Grass/Poison', imagem: 'venusaur.png' },
                { id: 4, nome: 'Charmander', tipo: 'Fire', imagem: 'charmander.png' },
                { id: 5, nome: 'Charmeleon', tipo: 'Fire', imagem: 'charmeleon.png' },
                { id: 6, nome: 'Charizard', tipo: 'Fire/Flying', imagem: 'charizard.png' },
                { id: 7, nome: 'Squirtle', tipo: 'Water', imagem: 'squirtle.png' },
                { id: 8, nome: 'Wartortle', tipo: 'Water', imagem: 'wartortle.png' },
                { id: 9, nome: 'Blastoise', tipo: 'Water', imagem: 'blastoise.png' },
                { id: 10, nome: 'Caterpie', tipo: 'Bug', imagem: 'caterpie.png' }
            ];

            for (const pokemon of pokemons) {
                await connection.execute(
                    'INSERT INTO pokemons (id, nome, tipo, imagem) VALUES (?, ?, ?, ?)',
                    [pokemon.id, pokemon.nome, pokemon.tipo, pokemon.imagem]
                );
            }
            console.log('Pokémons inseridos com sucesso!');
        }

        await connection.end();
    } catch (error) {
        console.error('Erro ao popular banco de dados:', error);
        throw error;
    }
}

module.exports = {
    createConnection,
    createDatabase,
    createTables,
    seedDatabase,
    dbConfig
};
