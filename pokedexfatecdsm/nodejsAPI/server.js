const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { createConnection } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para log das requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: 'API Pokédex FATEC DSM',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      usuarios: {
        login: 'POST /api/login',
        cadastro: 'POST /api/usuarios',
        listar: 'GET /api/usuarios'
      },
      pokemons: {
        listar: 'GET /api/pokemons',
        buscar: 'GET /api/pokemons/:id',
        criar: 'POST /api/pokemons'
      },
      sync: {
        usuario: 'POST /api/sync_user',
        pokemon: 'POST /api/sync_pokemon'
      }
    }
  });
});

// ===========================================
// ROTAS DE USUÁRIOS
// ===========================================

// Login de usuário
app.post('/api/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ 
        error: 'Email e senha são obrigatórios' 
      });
    }

    const connection = await createConnection();
    const [rows] = await connection.execute(
      'SELECT id, email FROM usuarios WHERE email = ? AND senha = ?',
      [email, senha]
    );
    await connection.end();

    if (rows.length > 0) {
      res.json({
        success: true,
        message: 'Login realizado com sucesso',
        user: rows[0]
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Email ou senha incorretos'
      });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Cadastrar usuário
app.post('/api/usuarios', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ 
        error: 'Email e senha são obrigatórios' 
      });
    }

    const connection = await createConnection();
    
    // Verificar se email já existe
    const [existing] = await connection.execute(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      await connection.end();
      return res.status(409).json({
        error: 'Email já cadastrado'
      });
    }

    // Inserir novo usuário
    const [result] = await connection.execute(
      'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
      [email, senha]
    );
    await connection.end();

    res.status(201).json({
      success: true,
      message: 'Usuário cadastrado com sucesso',
      user: {
        id: result.insertId,
        email: email
      }
    });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Listar usuários
app.get('/api/usuarios', async (req, res) => {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute(
      'SELECT id, email, created_at FROM usuarios ORDER BY created_at DESC'
    );
    await connection.end();

    res.json({
      success: true,
      usuarios: rows
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// ===========================================
// ROTAS DE POKÉMONS
// ===========================================

// Listar todos os pokémons
app.get('/api/pokemons', async (req, res) => {
  try {
    const connection = await createConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM pokemons ORDER BY id ASC'
    );
    await connection.end();

    res.json({
      success: true,
      pokemons: rows
    });
  } catch (error) {
    console.error('Erro ao listar pokémons:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Buscar pokémon por ID
app.get('/api/pokemons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await createConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM pokemons WHERE id = ?',
      [id]
    );
    await connection.end();

    if (rows.length > 0) {
      res.json({
        success: true,
        pokemon: rows[0]
      });
    } else {
      res.status(404).json({
        error: 'Pokémon não encontrado'
      });
    }
  } catch (error) {
    console.error('Erro ao buscar pokémon:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Adicionar novo pokémon
app.post('/api/pokemons', async (req, res) => {
  try {
    const { id, nome, tipo, imagem } = req.body;

    if (!id || !nome || !tipo) {
      return res.status(400).json({ 
        error: 'ID, nome e tipo são obrigatórios' 
      });
    }

    const connection = await createConnection();
    
    // Verificar se pokémon já existe
    const [existing] = await connection.execute(
      'SELECT id FROM pokemons WHERE id = ?',
      [id]
    );

    if (existing.length > 0) {
      await connection.end();
      return res.status(409).json({
        error: 'Pokémon com este ID já existe'
      });
    }

    // Inserir novo pokémon
    await connection.execute(
      'INSERT INTO pokemons (id, nome, tipo, imagem) VALUES (?, ?, ?, ?)',
      [id, nome, tipo, imagem || null]
    );
    await connection.end();

    res.status(201).json({
      success: true,
      message: 'Pokémon adicionado com sucesso',
      pokemon: { id, nome, tipo, imagem }
    });
  } catch (error) {
    console.error('Erro ao adicionar pokémon:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// ===========================================
// ROTAS DE SINCRONIZAÇÃO (compatibilidade com PHP)
// ===========================================

// Sincronizar usuário (compatível com sync_user.php)
app.post('/api/sync_user', async (req, res) => {
  try {
    const { id, email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ 
        error: 'Email e senha são obrigatórios' 
      });
    }

    const connection = await createConnection();
    
    if (id) {
      // Atualizar usuário existente ou inserir se não existir
      await connection.execute(`
        INSERT INTO usuarios (id, email, senha) VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE email = VALUES(email), senha = VALUES(senha)
      `, [id, email, senha]);
    } else {
      // Inserir novo usuário
      await connection.execute(
        'INSERT IGNORE INTO usuarios (email, senha) VALUES (?, ?)',
        [email, senha]
      );
    }
    
    await connection.end();

    res.json({
      success: true,
      message: 'Usuário sincronizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao sincronizar usuário:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Sincronizar pokémon (compatível com sync_pokemon.php)
app.post('/api/sync_pokemon', async (req, res) => {
  try {
    const { id, nome, tipo, imagem } = req.body;

    if (!id || !nome || !tipo) {
      return res.status(400).json({ 
        error: 'ID, nome e tipo são obrigatórios' 
      });
    }

    const connection = await createConnection();
    
    // Inserir ou atualizar pokémon
    await connection.execute(`
      INSERT INTO pokemons (id, nome, tipo, imagem) VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE nome = VALUES(nome), tipo = VALUES(tipo), imagem = VALUES(imagem)
    `, [id, nome, tipo, imagem]);
    
    await connection.end();

    res.json({
      success: true,
      message: 'Pokémon sincronizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao sincronizar pokémon:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// ===========================================
// MIDDLEWARE DE ERRO 404
// ===========================================
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    message: 'Verifique a documentação da API em /'
  });
});

// ===========================================
// INICIAR SERVIDOR
// ===========================================
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 API disponível em: http://localhost:${PORT}`);
  console.log(`📖 Documentação em: http://localhost:${PORT}/`);
});

module.exports = app;
