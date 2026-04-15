# SPEC - Scania Clube App

## 1) Contexto Tecnico

Documento de especificacao tecnica (SPEC) do Scania Clube, baseado no estado atual do codigo.

## 2) Arquitetura de Alto Nivel

- App React Native (Expo) com navegacao via React Navigation.
- Estado global principal via AuthContext.
- Persistencia local via AsyncStorage.
- Camada de servicos por dominio consumindo API REST (Axios).
- Internacionalizacao via i18next + react-i18next.

## 3) Stack Tecnica

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

## 4) Estrutura de Modulos no Codigo

- Contexto: src/contexts/auth.tsx
- Rotas: src/routes/index.tsx, src/routes/auth.routes.tsx, src/routes/privacy.routes.tsx, src/routes/app.routes.tsx
- Servicos: src/services/*.ts (auth, home, activity, beautyCenter, academy, events, exams, snackBar, space, user, register)
- Telas: src/screens/*
- Componentes reutilizaveis: src/components/*
- Tipos/interfaces: src/interfaces/interfaces.ts
- i18n: src/languages/*

## 5) Fluxo de Roteamento

- loading = true -> mostra ActivityIndicator.
- signed = false -> AuthRoutes.
- signed = true e policyAccepted = false -> PrivacyRoutes.
- signed = true e policyAccepted = true -> AppRoutes.

## 6) Persistencia Local

Chaves principais observadas:
- @ClubeScania:user
- @ClubeScania:token
- @ClubeScania:fileServer
- @ClubeScania:language

## 7) Camada de API

- Cliente unico Axios em src/services/api.ts.
- Base URL de producao configurada para backend Azure.
- Header Authorization definido apos login.
- Servicos organizados por contexto funcional.

## 8) Dominios Funcionais e Servicos

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

## 9) Modelagem (interfaces principais)

Entidades observadas no codigo:
- User
- Activity
- ScheduleActivity
- Event e EventDetailProps
- Professional
- ExamsProps
- SnackBarProps
- ModelResult e objetos de mensagem de validacao

## 10) Internacionalizacao

- Provider i18next inicializado com resources pt e en.
- Linguagem padrao pt.
- Mudanca de idioma em runtime com persistencia local.
- Campos PT/EN em objetos de dominio para conteudo bilingue.

## 11) Seguranca (estado atual)

- Modelo atual: token bearer em storage local.
- Pontos a melhorar:
  - refresh token e tratamento de 401
  - limpeza completa de sessao e headers no logout
  - politicas de timeout/retry no cliente HTTP

## 12) Confiabilidade e Observabilidade

Estado atual:
- Sem error boundary global.
- Sem timeout padrao no Axios.
- Sem trilha robusta de telemetria/app monitoring no cliente.

Recomendado:
- ErrorBoundary global.
- timeout + interceptors de erro/retry.
- padronizacao de logs de falha por modulo/tela.

## 13) Qualidade e Testes

Estado atual:
- Nao foi identificado conjunto robusto de testes automatizados no app.

Recomendado:
- Unit tests para servicos e utilitarios.
- Component tests para componentes criticos.
- E2E para fluxos chave (login, reserva, pagamento, cancelamento).

## 14) Requisitos Tecnicos para Evolucao (Backlog tecnico)

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

## 15) Fontes Analisadas (codigo)

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

## 16) Observacao Final

- Este documento descreve o estado tecnico atual observado no repositorio.
- Recomenda-se validacao conjunta com backend para consolidar contratos de API e roadmap tecnico.
