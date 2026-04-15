# PRD - Scania Clube App

## 1) Contexto

Documento de requisitos de produto (PRD) para o app mobile Scania Clube, elaborado a partir da analise do codigo atual.

Base do produto:
- Plataforma: React Native com Expo
- Build target: iOS e Android
- Arquitetura: app mobile cliente consumindo API REST
- Idiomas: pt e en

## 2) Visao do Produto

O Scania Clube e um app corporativo para colaboradores, centralizando acesso a atividades, espacos, centro estetico, eventos, exames e servicos de cafeteria, com foco em reserva de experiencias e autogestao do usuario.

## 3) Problema que o Produto Resolve

Antes do app, a jornada de acesso a servicos internos tende a ser fragmentada (canais separados, baixa visibilidade de agenda, historico disperso). O app resolve isso com:
- descoberta de ofertas em um unico ponto
- agendamento simplificado por data/horario
- historico de uso
- perfil e preferencias (inclusive idioma)

## 4) Objetivos de Negocio

- Aumentar adesao dos colaboradores aos servicos do clube.
- Reduzir friccao operacional de reservas e cancelamentos.
- Melhorar comunicacao de eventos e campanhas.
- Estruturar experiencia digital unificada para bem-estar interno.

## 5) Publico-Alvo (Personas)

- Colaborador geral: quer ver atividades e reservar rapidamente.
- Usuario de bem-estar: foco em centro estetico e servicos de cuidado pessoal.
- Usuario fitness: foco em treinos, exercicios e historico.
- Usuario de eventos: participa de eventos com possivel pagamento.
- Novo usuario: precisa onboarding simples com cadastro/login e aceite de politica.

## 6) Escopo Funcional Atual

### 6.1 Autenticacao e Conta
- Login com CPF e senha.
- Cadastro de usuario.
- Recuperacao de senha.
- Edicao de perfil (inclui imagem e idioma).
- Exclusao/remocao de conta.
- Fluxo de aceite de politica de privacidade apos autenticacao.

### 6.2 Home e Descoberta
- Dashboard com banners.
- Atividades curtidas/favoritas.
- Entradas recentes e atalhos para modulos.

### 6.3 Atividades e Reservas
- Listagem de atividades.
- Detalhe de atividade.
- Reserva por data/horario.
- Visualizacao de vagas.
- Historico e cancelamento.

### 6.4 Centro Estetico
- Listagem de opcoes/servicos.
- Selecao de profissional.
- Agenda por disponibilidade.
- Historico e cancelamento.

### 6.5 Treinamento
- Listagem de fichas.
- Detalhe de exercicios.
- Conteudo com link de video.
- Historico.

### 6.6 Eventos
- Listagem de eventos ativos.
- Detalhe de evento.
- Reserva com formulario.
- Fluxo de pagamento via WebView (Mercado Pago).

### 6.7 Espacos
- Reserva de espacos.
- Consulta de agendamentos.
- Cancelamento.

### 6.8 Exames
- Consulta de exames.
- Upload/anexo de exame.
- Suporte a regras de autorizacao/validade no fluxo de negocio.

### 6.9 Cafeteria
- Listagem de itens.
- Prato do dia.
- Categorias.
- Contatos/horarios.

## 7) Jornada Principal do Usuario

1. Usuario abre app.
2. Se nao autenticado: fluxo de login/cadastro.
3. Se autenticado sem politica aceita: tela de privacidade.
4. Se autenticado com politica aceita: acesso a tabs principais.
5. Usuario navega por modulo, reserva, consulta historico e gerencia perfil.

## 8) Requisitos Funcionais (RF)

- RF-01: autenticar usuario e manter sessao local.
- RF-02: permitir alternancia de idioma (pt/en).
- RF-03: exibir home com conteudo dinamico de backend.
- RF-04: listar e detalhar atividades/eventos/servicos.
- RF-05: criar e cancelar reservas.
- RF-06: manter historico por modulo.
- RF-07: suportar upload de anexos de exame.
- RF-08: executar fluxo de pagamento para eventos aplicaveis.
- RF-09: permitir edicao de perfil e remocao de conta.

## 9) Requisitos Nao Funcionais (RNF)

- RNF-01: disponibilidade mobile iOS/Android.
- RNF-02: internacionalizacao nativa pt/en.
- RNF-03: persistencia local de sessao e preferencias com AsyncStorage.
- RNF-04: resposta de API consistente com tratamento de erro amigavel ao usuario.
- RNF-05: navegacao fluida entre tabs e stacks.

## 10) Metricas de Sucesso (KPIs)

- Taxa de login concluido.
- Conversao de reserva por modulo (atividades, centro estetico, espacos, eventos).
- Taxa de cancelamento.
- DAU/WAU e retencao D7/D30.
- Tempo medio entre descoberta e conclusao de reserva.
- Taxa de erro por endpoint e por tela.

## 11) Fora de Escopo Atual

- Operacao offline-first robusta.
- Motor de recomendacao personalizado.
- Telemetria avancada e observabilidade ponta a ponta.
- Testes automatizados amplos (suite madura de unit/integration/e2e).

## 12) Riscos de Produto e Tecnicos

- Expiracao de token sem estrategia de refresh.
- Cliente HTTP sem timeout configurado.
- Ausencia de error boundary global.
- Dependencia de integracoes externas sem monitoramento centralizado.

## 13) Decisoes e Observacoes

- Este documento descreve o estado atual do produto observado no repositorio.
- Onde houver divergencia entre app e backend, o backend permanece a fonte de verdade para regras de negocio.
- Recomenda-se revisao conjunta com time de produto, mobile e backend para fechamento de roadmap oficial.
