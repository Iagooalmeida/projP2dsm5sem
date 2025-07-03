# Pokédex FATEC DSM

Um aplicativo Flutter integrado com API Node.js para gerenciar pokémons e usuários.

## Estrutura do Projeto

```text
pokedexfatecdsm/
├── lib/                    # Código fonte Flutter
│   ├── config/            # Configurações da API
│   ├── models/            # Modelos de dados
│   ├── database_helper.dart
│   ├── tela_login.dart
│   ├── tela_home.dart
│   └── main.dart
├── nodejsAPI/             # API Node.js + MySQL
│   ├── server.js
│   ├── database.js
│   ├── setup.js
│   └── package.json
├── assets/images/         # Imagens dos pokémons
└── CONFIGURACAO_API.md    # Guia de configuração da API
```

## Configuração e Execução

### 1. Configurar a API Node.js

```bash
cd nodejsAPI
npm install
node setup.js
node server.js
```

### 2. Configurar o Flutter

```bash
flutter pub get
flutter run
```

### 3. Configurar URL da API

Consulte o arquivo `CONFIGURACAO_API.md` para instruções detalhadas sobre como configurar a URL da API para diferentes ambientes (emulador, dispositivo físico, web).

## Funcionalidades

- 🔐 Login e logout de usuários
- 🔄 Sincronização entre SQLite local e MySQL
- 📱 Interface moderna e responsiva
- 🎯 Gerenciamento de pokémons
- 🌐 API REST completa

## Recursos Adicionais

- [Documentação Flutter](https://docs.flutter.dev/)
- [Guia Node.js](https://nodejs.org/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
