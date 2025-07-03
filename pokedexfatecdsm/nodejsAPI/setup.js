const { createDatabase, createTables, seedDatabase } = require('./database');

async function setup() {
  try {
    console.log('🚀 Iniciando configuração do banco de dados...');
    
    // 1. Criar banco de dados
    console.log('📦 Criando banco de dados...');
    await createDatabase();
    
    // 2. Criar tabelas
    console.log('🔧 Criando tabelas...');
    await createTables();
    
    // 3. Popular com dados iniciais
    console.log('🌱 Populando com dados iniciais...');
    await seedDatabase();
    
    console.log('✅ Configuração concluída com sucesso!');
    console.log('📊 Banco de dados pronto para uso!');
    
  } catch (error) {
    console.error('❌ Erro durante a configuração:', error);
    process.exit(1);
  }
}

// Executar setup se chamado diretamente
if (require.main === module) {
  setup();
}

module.exports = { setup };
