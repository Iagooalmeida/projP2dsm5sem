# 🔧 Configuração da API para Sincronização

## 🏗️ Estrutura do Projeto

A API Node.js agora está integrada ao projeto Flutter na pasta `nodejsAPI/`.

```text
pokedexfatecdsm/
├── lib/config/api_config.dart  # Configuração da URL da API
├── nodejsAPI/                  # API Node.js + MySQL
│   ├── server.js
│   ├── .env                   # Configuração do MySQL
│   └── ...
└── CONFIGURACAO_API.md        # Este arquivo
```

## 🚀 Iniciando a API

```bash
# Navegar para a pasta da API
cd nodejsAPI

# Instalar dependências (primeira vez)
npm install

# Configurar banco de dados (primeira vez)
node setup.js

# Iniciar servidor
node server.js
```

## 📱 Configuração por Ambiente

### 1. **Emulador Android** (Configuração Atual)

```dart
// Em lib/config/api_config.dart
static const String baseUrl = emulatorUrl; // http://10.0.2.2:3000/api
```

### 2. **Dispositivo Físico** (Android/iOS)

```dart
// Em lib/config/api_config.dart
static const String baseUrl = physicalDeviceUrl; // http://192.168.1.X:3000/api
```

**⚠️ IMPORTANTE:** Substitua `192.168.1.X` pelo IP real da sua máquina:

- Windows: `ipconfig` (procure por IPv4)
- Mac/Linux: `ifconfig` ou `ip addr`

### 3. **Flutter Web** (Navegador)

```dart
// Em lib/config/api_config.dart
static const String baseUrl = webUrl; // http://localhost:3000/api
```

## 🚀 Como Descobrir o IP da Sua Máquina

### Windows

```cmd
ipconfig
```

Procure por "Adaptador de Rede sem Fio" → "Endereço IPv4"

### Mac/Linux

```bash
ifconfig
# ou
ip addr show
```

## 🔄 Testando a Conexão

1. **Verifique se a API está rodando:**

```bash

   cd nodejsAPI
   npm run dev
   ```

2. **Teste no navegador:**
   - Emulador: `http://10.0.2.2:3000`
   - Dispositivo físico: `http://SEU_IP:3000`
   - Web: `http://localhost:3000`

## 🐛 Resolução de Problemas

### Erro "Connection refused"

- ✅ Verifique se a API Node.js está rodando
- ✅ Verifique se o MySQL está funcionando
- ✅ Confirme o IP correto no arquivo `api_config.dart`

### Para Dispositivo Físico

- ✅ Celular e computador na mesma rede Wi-Fi
- ✅ Firewall/antivírus não bloqueia a porta 3000
- ✅ IP da máquina está correto no `api_config.dart`

### Para Emulador

- ✅ Use sempre `10.0.2.2` ao invés de `localhost`
- ✅ Reinicie o emulador se necessário

## 📝 Exemplo de Configuração

```dart
// lib/config/api_config.dart
class ApiConfig {
  // Escolha UMA das opções abaixo:
  
  // Opção 1: Emulador Android
  static const String baseUrl = 'http://10.0.2.2:3000/api';
  
  // Opção 2: Dispositivo físico (substitua pelo SEU IP)
  // static const String baseUrl = 'http://192.168.1.100:3000/api';
  
  // Opção 3: Flutter Web
  // static const String baseUrl = 'http://localhost:3000/api';
}
```
