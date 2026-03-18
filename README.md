# 🌍 Sistema de Monitoramento Ambiental - API de Entidades

### 📋 Sobre o Projeto
Esta API foi desenvolvida como uma solução técnica para o gerenciamento de dados provenientes de estações de monitoramento ambiental. O sistema é capaz de cadastrar áreas geográficas (biomas), gerenciar sensores e registrar leituras de telemetria, permitindo o acompanhamento preciso de variáveis ambientais.

### 🎯 Objetivos de Negócio e Técnicos
- Gestão de Telemetria: Estruturação de dados para receber informações de sensores em tempo real.
- Consistência Geográfica: Validação rigorosa de coordenadas (latitude/longitude) e tipos de biomas para garantir a precisão dos relatórios técnicos.
- Arquitetura Profissional: Divisão clara entre lógica de negócio (Services) e controle de fluxo (Controllers), facilitando a manutenção e suporte.

### 🛠️ Tecnologias e Ferramentas
- Runtime: Node.js com TypeScript.
- Framework: Express.
- Validação: Middleware de validação customizado para garantir a integridade dos dados de sensores.
- Padronização: Implementação de CRUD completo para as entidades de Área, Sensor e Leitura.

### 🏗️ Estrutura de Solução
- Entities: Modelagem de dados para áreas, dispositivos (sensores) e logs de leitura.
- Middlewares: Camada de validação que intercepta as rotas POST e PUT, garantindo que apenas dados dentro dos parâmetros técnicos sejam processados.
- Routes: Endpoints organizados por domínio para fácil integração com front-end ou sistemas de visualização de dados.

### 🚀 Configuração Rápida
- Instale as dependências: `npm install`
- Configure o servidor no arquivo de entrada.
- Inicie em modo de desenvolvimento: `npm run dev`
