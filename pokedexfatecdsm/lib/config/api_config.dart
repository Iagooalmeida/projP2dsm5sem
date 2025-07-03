class ApiConfig {
  // Configuração da URL da API
  // Escolha a URL apropriada para o seu ambiente:
  
  // Para emulador Android
  static const String emulatorUrl = 'http://10.0.2.2:3000/api';
  
  // Para dispositivo físico Android/iOS (substitua pelo IP da sua máquina)
  static const String physicalDeviceUrl = 'http://192.168.0.103:3000/api';
  
  // Para teste no navegador (Chrome/Web)
  static const String webUrl = 'http://localhost:3000/api';
  
  // URL atual sendo usada (altere conforme necessário)
  static const String baseUrl = emulatorUrl;
  
  // Endpoints
  static const String syncUserEndpoint = '/sync_user';
  static const String syncPokemonEndpoint = '/sync_pokemon';
  static const String loginEndpoint = '/login';
  static const String pokemonsEndpoint = '/pokemons';
  
  // URLs completas
  static String get syncUserUrl => baseUrl + syncUserEndpoint;
  static String get syncPokemonUrl => baseUrl + syncPokemonEndpoint;
  static String get loginUrl => baseUrl + loginEndpoint;
  static String get pokemonsUrl => baseUrl + pokemonsEndpoint;
}
