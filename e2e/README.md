# E2E Flows (Maestro)

Fluxos criticos cobertos:
- login: `e2e/maestro/login-flow.yaml`
- reserva: `e2e/maestro/reserve-flow.yaml`
- cancelamento: `e2e/maestro/cancel-reservation-flow.yaml`

Execucao local (com app emulando/dispositivo aberto):

```bash
maestro test e2e/maestro/login-flow.yaml
maestro test e2e/maestro/reserve-flow.yaml
maestro test e2e/maestro/cancel-reservation-flow.yaml
```
