#!/bin/bash

echo "🚀 Iniciando Sistema de Suporte para Famílias com Pessoas Autistas"

# Parar processos existentes
echo "🔄 Parando processos existentes..."
pkill -f "spring-boot:run" 2>/dev/null || true
pkill -f "react-scripts start" 2>/dev/null || true
lsof -ti:8080 | xargs kill -9 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

sleep 2

# Iniciar backend
echo "🔧 Iniciando backend (porta 8080)..."
cd backend
mvn spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Aguardar backend inicializar
echo "⏳ Aguardando backend inicializar..."
for i in {1..30}; do
    if curl -s http://localhost:8080/api/help/requests > /dev/null 2>&1; then
        echo "✅ Backend iniciado com sucesso!"
        break
    fi
    sleep 1
done

# Iniciar frontend
echo "🎨 Iniciando frontend (porta 3000)..."
npm start > frontend.log 2>&1 &
FRONTEND_PID=$!

# Aguardar frontend inicializar
echo "⏳ Aguardando frontend inicializar..."
for i in {1..30}; do
    if curl -s -I http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Frontend iniciado com sucesso!"
        break
    fi
    sleep 1
done

echo ""
echo "🎉 Sistema iniciado com sucesso!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8080/api/help/requests"
echo "🗄️  H2 Console: http://localhost:8080/h2-console"
echo ""
echo "Para parar o sistema, execute: ./stop.sh"