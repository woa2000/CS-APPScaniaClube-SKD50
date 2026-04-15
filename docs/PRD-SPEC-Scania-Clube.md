# PRD + SPEC - Scania Clube App

## 1) Contexto

Documento consolidado de Produto (PRD) e Especificacao Tecnica (SPEC) para o app mobile Scania Clube, elaborado a partir da analise do codigo atual.

Base do produto:
- Plataforma: React Native com Expo
- Build target: iOS e Android
- Arquitetura: app mobile cliente consumindo API REST
- Idiomas: pt e en

---

## 2) PRD (Product Requirements Document)

### 2.1 Visao do Produto

O Scania Clube e um app corporativo para colaboradores, centralizando acesso a atividades, espacos, centro estetico, eventos, exames e servicos de cafeteria, com foco em reserva de experiencias e autogestao do usuario.

### 2.2 Problema que o Produto Resolve

Antes do app, a jornada de acesso a servicos internos tende a ser fragmentada (canais separados, baixa visibilidade de agenda, historico disperso). O app resolve isso com:
- descoberta de ofertas em um unico ponto
- agendamento simplificado por data/horario
- historico de uso
- perfil e preferencias (inclusive idioma)

### 2.3 Objetivos de Negocio

- Aumentar adesao dos colaboradores aos servicos do clube.
- Reduzir friccao operacional de reservas e cancelamentos.
- Melhorar comunicacao de eventos e campanhas.
- Estruturar experiencia digital unificada para bem-estar interno.

### 2.4 Publico-Alvo (Personas)

- Colaborador geral: quer ver atividades e reservar rapidamente.
- Usuario de bem-estar: foco em centro estetico e servicos de cuidado pessoal.
- Usuario fitness: foco em treinos, exercicios e historico.
- Usuario de eventos: participa de eventos com possivel pagamento.
- Novo usuario: precisa onboarding simples com cadastro/login e aceite de politica.

### 2.5 Escopo Funcional Atual (MVP em producao)

#### Autenticacao e Conta
- Login com CPF e senha.
- Cadastro de usuario.
- Recuperacao de senha.
- Edicao de perfil (inclui imagem e idioma).
- Exclusao/remocao de conta.
- Fluxo de aceite de politica de privacidade apos autenticacao.

#### Home e Descoberta
- Dashboard com banners.
- Atividades curtidas/favoritas.
- Entradas recentes e atalhos para modulos.

#### Atividades e Reservas
- Listagem de atividades.
- Detalhe de atividade.
- Reserva por data/horario.
- Visualizacao de vagas.
- Historico e cancelamento.

#### Centro Estetico
- Listagem de opcoes/servicos.
- Selecao de profissional.
- Agenda por disponibilidade.
- Historico e cancelamento.

#### Treinamento
- Listagem de fichas.
- Detalhe de exercicios.
- Conteudo com link de video.
- Historico.

#### Eventos
- Listagem de eventos ativos.
- Detalhe de evento.
- Reserva com formulario.
- Fluxo de pagamento via WebView (Mercado Pago).

#### Espacos
- Reserva de espacos.
- Consulta de agendamentos.
- Cancelamento.

#### Exames
- Consulta de exames.
- Upload/anexo de exame.
- Suporte a regras de autorizacao/validade no fluxo de negocio.

#### Cafeteria
- Listagem de itens.
- Prato do dia.
- Categorias.
- Contatos/horarios.

### 2.6 Jornada Principal do Usuario

1. Usuario abre app.
2. Se nao autenticado: fluxo de login/cadastro.
3. Se autenticado sem politica aceita: tela de privacidade.
4. Se autenticado com politica aceita: acesso a tabs principais.
5. Usuario navega por modulo, reserva, consulta historico e gerencia perfil.

### 2.7 Requisitos Funcionais (RF)

- RF-01: autenticar usuario e manter sessao local.
- RF-02: permitir alternancia de idioma (pt/en).
- RF-03: exibir home com conteudo dinamico de backend.
- RF-04: listar e detalhar atividades/eventos/servicos.
- RF-05: criar e cancelar reservas.
- RF-06: manter historico por modulo.
- RF-07: suportar upload de anexos de exame.
- RF-08: executar fluxo de pagamento para eventos aplicaveis.
- RF-09: permitir edicao de perfil e remocao de conta.

### 2.8 Requisitos Nao Funcionais (RNF)

- RNF-01: disponibilidade mobile iOS/Android.
- RNF-02: internacionalizacao nativa pt/en.
- RNF-03: persistencia local de sessao e preferencias com AsyncStorage.
- RNF-04: resposta de API consistente com tratamento de erro amigavel ao usuario.
- RNF-05: navegacao fluida entre tabs e stacks.

### 2.9 Metricas de Sucesso (KPIs sugeridos)

- Taxa de login concluido.
- Conversao de reserva por modulo (atividades, centro estetico, espacos, eventos).
- Taxa de cancelamento.
- DAU/WAU e retencao D7/D30.
- Tempo medio entre descoberta e conclusao de reserva.
- Taxa de erro por endpoint e por tela.

### 2.10 Fora de Escopo Atual

- Operacao offline-first robusta.
- Motor de recomendacao personalizado.
- Telemetria avancada e observabilidade ponta a ponta.
- Testes automatizados amplos (suite madura de unit/integration/e2e).

### 2.11 Riscos de Produto e Tecnicos

- Expiracao de token sem estrategia de refresh.
- Cliente HTTP sem timeout configurado.
- Ausencia de error boundary global.
- Dependencia de integracoes externas sem monitoramento centralizado.

---

## 3) SPEC (Especificacao Tecnica)

### 3.1 Arquitetura de Alto Nivel

- App React Native (Expo) com navegacao via React Navigation.
- Estado global principal via AuthContext.
- Persistencia local via AsyncStorage.
- Camada de servicos por dominio consumindo API REST (Axios).
- Internacionalizacao via i18next + react-i18next.

### 3.2 Stack Tecnica

- React 18
- React Native 0.76
- Expo SDK 52
- TypeScript 5
- Axios
- React Navigation (stack + bottom-tabs)
- styled-components
- formik + yup
- i18next + react-i18next
- AsyncStorage

### 3.3 Estrutura de Modulos no Codigo

- Contexto: src/contexts/auth.tsx
- Rotas: src/routes/index.tsx, src/routes/auth.routes.tsx, src/routes/privacy.routes.tsx, src/routes/app.routes.tsx
- Servicos: src/services/*.ts (auth, home, activity, beautyCenter, academy, events, exams, snackBar, space, user, register)
- Telas: src/screens/*
- Componentes reutilizaveis: src/components/*
- Tipos/interfaces: src/interfaces/interfaces.ts
- i18n: src/languages/*

### 3.4 Fluxo de Roteamento

- loading = true -> mostra ActivityIndicator.
- signed = false -> AuthRoutes.
- signed = true e policyAccepted = false -> PrivacyRoutes.
- signed = true e policyAccepted = true -> AppRoutes.

### 3.5 Persistencia Local

Chaves principais observadas:
- @ClubeScania:user
- @ClubeScania:token
- @ClubeScania:fileServer
- @ClubeScania:language

### 3.6 Camada de API

- Cliente unico Axios em src/services/api.ts.
- Base URL de producao configurada para backend Azure.
- Header Authorization definido apos login.
- Servicos organizados por contexto funcional.

### 3.7 Dominios Funcionais e Servicos

- auth.ts: login, cadastro, perfil, idioma, remocao de conta.
- home.ts: dados da home.
- activity.ts: atividades, agenda, historico, reservas.
- beautyCenter.ts: profissionais, agenda e reservas.
- academy.ts: fichas e exercicios.
- events.ts: eventos, reserva, dados para pagamento.
- exams.ts: exames e anexos.
- snackBar.ts: cafeteria e pratos.
- space.ts: reservas de espacos.
- user.ts/register.ts: operacoes complementares de usuario/cadastro.

### 3.8 Modelagem (interfaces principais)

Entidades observadas no codigo:
- User
- Activity
- ScheduleActivity
- Event e EventDetailProps
- Professional
- ExamsProps
- SnackBarProps
- ModelResult e objetos de mensagem de validacao

### 3.9 Internacionalizacao

- Provider i18next inicializado com resources pt e en.
- Linguagem padrao pt.
- Mudanca de idioma em runtime com persistencia local.
- Campos PT/EN em objetos de dominio para conteudo bilingue.

### 3.10 Seguranca (estado atual)

- Modelo atual: token bearer em storage local.
- Pontos a melhorar:
  - refresh token e tratamento de 401
  - limpeza completa de sessao e headers no logout
  - politicas de timeout/retry no cliente HTTP

### 3.11 Confiabilidade e Observabilidade

Estado atual:
- Sem error boundary global.
- Sem timeout padrao no Axios.
- Sem trilha robusta de telemetria/app monitoring no cliente.

Recomendado:
- ErrorBoundary global.
- timeout + interceptors de erro/retry.
- padronizacao de logs de falha por modulo/tela.

### 3.12 Qualidade e Testes

Estado atual:
- Nao foi identificado conjunto robusto de testes automatizados no app.

Recomendado:
- Unit tests para servicos e utilitarios.
- Component tests para componentes criticos.
- E2E para fluxos chave (login, reserva, pagamento, cancelamento).

### 3.13 Requisitos Tecnicos para Evolucao (Backlog tecnico)

Prioridade alta:
- ST-01: implementar refresh token + interceptor de 401.
- ST-02: configurar timeout global no Axios.
- ST-03: adicionar ErrorBoundary no root do app.
- ST-04: revisar fluxo de logout para limpar estado e header Authorization.

Prioridade media:
- ST-05: camada de cache de dados (ex.: React Query).
- ST-06: instrumentacao de telemetria/monitoramento.
- ST-07: ampliar cobertura de testes automatizados.

Prioridade baixa:
- ST-08: estrategia offline parcial para dados de leitura.
- ST-09: evoluir UX de estados vazios, loading e erro por modulo.

---

## 4) Fontes Analisadas (codigo)

Arquivos principais utilizados na analise:
- package.json
- App.tsx
- src/contexts/auth.tsx
- src/routes/index.tsx
- src/routes/auth.routes.tsx
- src/routes/privacy.routes.tsx
- src/routes/app.routes.tsx
- src/services/api.ts
- src/services/auth.ts
- src/services/activity.ts
- src/services/beautyCenter.ts
- src/services/academy.ts
- src/services/events.ts
- src/services/exams.ts
- src/services/home.ts
- src/services/snackBar.ts
- src/services/space.ts
- src/services/user.ts
- src/interfaces/interfaces.ts
- src/languages/i18n.js
- src/languages/portuguese.json
- src/languages/english.json

---

## 5) Decisoes e Observacoes

- Este documento descreve o estado atual do produto e sua especificacao tecnica observada no repositorio.
- Onde houver divergencia entre app e backend, o backend permanece a fonte de verdade para regras de negocio.
- Recomenda-se revisao conjunta com time de produto, mobile e backend para fechamento de roadmap oficial.
