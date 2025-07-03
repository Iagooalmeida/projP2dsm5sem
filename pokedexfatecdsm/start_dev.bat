@echo off
echo 🚀 Iniciando ambiente de desenvolvimento Pokédex FATEC DSM
echo.

echo 📦 Instalando dependências da API Node.js...
cd nodejsAPI
if not exist node_modules (
    npm install
)

echo 🛠️  Configurando banco de dados MySQL...
node setup.js

echo 🌐 Iniciando servidor da API...
start "API Node.js" cmd /k "node server.js"

echo.
echo ✅ API iniciada! Acesse: http://localhost:3000
echo.
echo 📱 Para iniciar o Flutter, execute:
echo    flutter pub get
echo    flutter run
echo.
pause
