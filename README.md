# Sistema de Suporte para Famílias com Pessoas Autistas

Sistema web simples para oferecer ajuda e suporte a famílias que têm pessoas com autismo.

## Tecnologias Utilizadas

- **Frontend**: React, HTML, CSS
- **Backend**: Java Spring Boot, JPA/Hibernate
- **Banco de Dados**: H2 (em memória)

## Funcionalidades

- Página inicial com informações sobre o sistema
- Recursos educativos para famílias
- Lista de contatos de apoio
- Formulário para solicitar ajuda
- API REST para gerenciar solicitações

## Como Executar

### Backend (Java)
```bash
cd backend
mvn spring-boot:run
```

### Frontend (React)
```bash
npm install
npm start
```

## Estrutura do Projeto

```
jpa.tcc/
├── backend/                 # API Java Spring Boot
│   ├── src/main/java/
│   │   └── com/autismsupport/
│   │       ├── model/       # Entidades JPA
│   │       ├── repository/  # Repositórios
│   │       └── controller/  # Controllers REST
│   └── pom.xml
├── src/                     # Frontend React
│   ├── App.js
│   ├── App.css
│   └── index.js
├── public/
│   └── index.html
└── package.json
```

## Endpoints da API

- `POST /api/help/request` - Criar solicitação de ajuda
- `GET /api/help/requests` - Listar todas as solicitações