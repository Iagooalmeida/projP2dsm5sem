# Script de inicialização para desenvolvimento - Pokédex FATEC DSM
Write-Host "🚀 Iniciando ambiente de desenvolvimento Pokédex FATEC DSM" -ForegroundColor Green
Write-Host ""

# Navegar para a pasta da API
Set-Location -Path "nodejsAPI"

# Instalar dependências se necessário
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências da API Node.js..." -ForegroundColor Yellow
    npm install
}

# Configurar banco de dados
Write-Host "🛠️  Configurando banco de dados MySQL..." -ForegroundColor Yellow
node setup.js

# Iniciar servidor em uma nova janela
Write-Host "🌐 Iniciando servidor da API..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node server.js"

Write-Host ""
Write-Host "✅ API iniciada! Acesse: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Para iniciar o Flutter, execute:" -ForegroundColor Cyan
Write-Host "   flutter pub get" -ForegroundColor White
Write-Host "   flutter run" -ForegroundColor White
Write-Host ""
Write-Host "Pressione qualquer tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
