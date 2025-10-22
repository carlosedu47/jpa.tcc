#!/bin/bash

echo "🛑 Parando Sistema de Suporte para Famílias com Pessoas Autistas"

# Parar processos
pkill -f "spring-boot:run" 2>/dev/null || true
pkill -f "react-scripts start" 2>/dev/null || true
lsof -ti:8080 | xargs kill -9 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

echo "✅ Sistema parado com sucesso!"