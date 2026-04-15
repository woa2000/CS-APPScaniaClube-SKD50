# Plano de Execucao - Prioridades Alta e Media

## 1) Objetivo

Executar os itens tecnicos de prioridade Alta e Media definidos na SPEC para elevar resiliencia, seguranca operacional, observabilidade e qualidade de entrega do app Scania Clube.

Escopo deste plano:
- Alta: ST-01, ST-02, ST-03, ST-04
- Media: ST-05, ST-06, ST-07

Referencia:
- [docs/SPEC-Scania-Clube.md](docs/SPEC-Scania-Clube.md)

---

## 2) Itens Prioritarios

### Alta prioridade

- ST-01: implementar refresh token + interceptor de 401.
- ST-02: configurar timeout global no Axios.
- ST-03: adicionar ErrorBoundary no root do app.
- ST-04: revisar fluxo de logout para limpar estado e header Authorization.

### Media prioridade

- ST-05: camada de cache de dados (ex.: React Query).
- ST-06: instrumentacao de telemetria/monitoramento.
- ST-07: ampliar cobertura de testes automatizados.

---

## 3) Sequenciamento de Execucao (8 semanas)

### Fase 1 - Fundacao de Resiliencia (Semanas 1-2)

Objetivo: impedir travamentos silenciosos e reduzir falhas por rede/sessao.

- Implementar ST-02 (timeout Axios).
- Implementar ST-03 (ErrorBoundary global).
- Implementar ST-04 (logout robusto, limpeza completa de sessao).

Entregaveis:
- Cliente HTTP com timeout padrao e mensagens de erro padronizadas.
- ErrorBoundary aplicado no root de navegacao.
- Logout limpando AsyncStorage e Authorization header.

Criterios de aceite:
- Requisicoes acima do timeout retornam erro amigavel em ate 35s.
- Excecoes de render nao derrubam o app sem fallback.
- Apos logout, nenhuma rota autenticada e acessivel sem novo login.

### Fase 2 - Sessao Segura e Continuidades (Semanas 3-4)

Objetivo: reduzir quebra de experiencia por expiracao de token.

- Implementar ST-01 (refresh token + interceptor 401 + retry controlado).

Entregaveis:
- Fluxo de renovacao de token centralizado em interceptor.
- Retry unico da requisicao apos refresh com controle anti-loop.
- Fallback para logout quando refresh falhar.

Criterios de aceite:
- Sessao e renovada automaticamente sem interromper jornada quando possivel.
- Falha de refresh invalida sessao com redirecionamento seguro para login.
- Nao ha loop infinito de requisicoes em cenarios de 401.

### Fase 3 - Performance de Dados e Observabilidade (Semanas 5-6)

Objetivo: reduzir chamadas redundantes e ganhar visibilidade operacional.

- Implementar ST-05 (cache com React Query em modulos mais acessados).
- Implementar ST-06 (telemetria de erro e eventos criticos de jornada).

Entregaveis:
- Query client configurado e aplicado em Home, Atividades e Reservas.
- Politicas de staleTime, refetch e invalidation definidas por modulo.
- Dashboards minimos: erros por tela, falha de API, tempo de resposta.

Criterios de aceite:
- Reducao minima de 20% em chamadas redundantes nos modulos migrados.
- Erros criticos (login/reserva/pagamento) rastreaveis por evento.
- Tempo medio de identificacao de falha reduzido no ciclo de suporte.

### Fase 4 - Qualidade de Entrega (Semanas 7-8)

Objetivo: garantir previsibilidade de release.

- Implementar ST-07 (testes automatizados focados em fluxo critico).

Entregaveis:
- Testes unitarios para servicos de autenticacao e utilitarios de sessao.
- Testes de componente para estados de erro e loading.
- Testes E2E para login, reserva e cancelamento.

Criterios de aceite:
- Cobertura minima: 60% nos modulos alterados.
- Fluxos criticos aprovados em pipeline antes de release.
- Taxa de regressao funcional reduzida sprint a sprint.

---

## 4) Dependencias e Ordem Tecnica

Ordem recomendada:
1. ST-02 e ST-03 (base de estabilidade).
2. ST-04 (higiene de sessao e seguranca operacional).
3. ST-01 (fluxo completo de autenticacao resiliente).
4. ST-05 (cache sobre camada HTTP estabilizada).
5. ST-06 (instrumentacao sobre fluxos ja estabilizados).
6. ST-07 (testes sobre comportamento consolidado).

Dependencias criticas:
- ST-01 depende de contrato de refresh no backend.
- ST-05 depende da padronizacao de erros e sucesso na camada HTTP.
- ST-06 depende de definicao de ferramenta/conta de monitoramento.
- ST-07 depende da estabilizacao minima dos fluxos de auth e reserva.

---

## 5) Plano de Entrega por Sprint

### Sprint 1

- Timeout global Axios.
- ErrorBoundary root.
- Logout seguro.
- Documentacao de politicas de erro.

### Sprint 2

- Refresh token + interceptor 401.
- Retry controlado e fallback seguro.
- Testes unitarios iniciais do fluxo de autenticacao.

### Sprint 3

- Introducao de React Query em telas de alto trafego.
- Instrumentacao de eventos criticos.
- Dashboards iniciais de observabilidade.

### Sprint 4

- Expansao da cobertura de testes (component + E2E).
- Hardening final e checklist de release.
- Revisao de indicadores de sucesso.

---

## 6) RACI Simplificado

- Mobile Lead: arquitetura de auth, interceptors, ErrorBoundary.
- Dev Mobile: implementacao de telas/servicos e migracao para cache.
- Backend Lead: contrato de refresh token e codigos de erro consistentes.
- QA: estrategia de testes, cenarios de regressao e criterios de aceite.
- Produto: priorizacao funcional e validacao de impacto em UX.
- DevOps/Observabilidade: pipeline, dashboards e alertas.

---

## 7) Riscos e Mitigacoes

- Risco: refresh token sem contrato robusto no backend.
  - Mitigacao: alinhar contrato antes da Sprint 2 e criar testes de contrato.

- Risco: aumento de complexidade ao introduzir cache.
  - Mitigacao: migracao por modulo com feature flag e rollback simples.

- Risco: baixa maturidade de testes atrasar release.
  - Mitigacao: focar em fluxos criticos e cobertura incremental por sprint.

- Risco: telemetria gerar ruido sem padrao.
  - Mitigacao: taxonomia de eventos e erros definida antes da instrumentacao.

---

## 8) KPIs de Acompanhamento do Plano

- Falhas de autenticacao por expiracao de token.
- Taxa de erro por endpoint critico (login, reservas, eventos).
- Latencia percebida nas telas migradas para cache.
- Cobertura de testes nos modulos alterados.
- Incidentes de regressao por release.

---

## 9) Definition of Done (DoD)

Cada item ST sera considerado concluido quando:
- Codigo implementado e revisado por pares.
- Testes automatizados correspondentes aprovados.
- Evidencia de aceite registrada (video curto ou checklist).
- Documentacao tecnica atualizada em [docs/SPEC-Scania-Clube.md](docs/SPEC-Scania-Clube.md).
- Validacao final em ambiente de homologacao.

---

## 10) Proximo Passo Recomendado

Executar uma reuniao de kickoff tecnico de 60 minutos para:
- confirmar contrato de refresh token com backend
- decidir ferramenta de observabilidade
- fechar metas de cobertura de testes por sprint
- aprovar sequenciamento final de Sprint 1 a Sprint 4
