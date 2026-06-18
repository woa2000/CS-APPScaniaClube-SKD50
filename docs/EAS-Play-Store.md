# Publicacao Android com EAS e Google Play

Este projeto ja esta preparado para automatizar build e envio Android com EAS para o app `com.rasystem.appclubescania`.

## Estado atual configurado

- Service Account criada no Google Cloud:
  - `play-submit-scania-clube@rise-371313.iam.gserviceaccount.com`
- Chave JSON local gerada em:
  - `.secrets/play-submit-scania-clube.json`
- Chave de submissao vinculada no EAS para Play Store submissions
- Keystore Android ja existente no EAS com:
  - `SHA1: EE:DC:9D:A1:3E:AE:34:2B:A6:24:E3:B7:19:AF:8F:69:EA:E8:F0:EC`
  - `SHA256: 17:D6:04:0B:DE:39:17:9A:45:25:65:94:95:E5:F9:FE:B3:34:6A:9C:85:54:93:01:10:B7:50:53:94:67:16:96`

## O que ficou configurado

- `eas.json`
  - `cli.appVersionSource: "remote"` para o EAS controlar o `versionCode`
  - `build.production.autoIncrement: true` para incrementar o `versionCode` a cada build de producao
  - `submit.production.android.track: "internal"` para envio automatico seguro para teste interno
  - `submit.playstore.android.track: "production"` para publicacao publica quando desejado
- `package.json`
  - `npm run eas:build:android`
  - `npm run eas:submit:android`
  - `npm run release:android:internal`
  - `npm run release:android:play`

## Credenciais que o EAS precisa

Para Android publicado na Play Store, voce precisa de duas coisas diferentes:

1. Keystore de assinatura/upload key
   - O EAS pode gerar e armazenar isso para o build Android.
   - Se o app ja foi publicado antes com outra chave, a chave usada pelo EAS precisa ser a mesma chave de upload aceita hoje pela Google Play.

2. Google Service Account JSON
   - Essa chave JSON e usada pelo `eas submit` para enviar o `.aab` para a Play Console.
   - Ela nao assina o app. Ela so autentica a automacao contra a Play Store.

## Como destravar a Google Service Account

1. Entre na Play Console com a conta dona do app `com.rasystem.appclubescania`.
2. Confirme que o app ja teve pelo menos um envio manual anteriormente.
3. Na Play Console, convide o email abaixo em `Users and permissions`:
   - `play-submit-scania-clube@rise-371313.iam.gserviceaccount.com`
4. Dê permissao ao menos para:
   - visualizar o app
   - gerenciar versoes/releases do app
5. Aceite o convite da service account na configuracao do app ou da conta, conforme a Play Console solicitar.

Depois disso, o EAS ja esta configurado com essa chave para submissao Android.

## Primeiro ajuste obrigatorio de versao

Como o app ja esta publicado e hoje esta em `android.versionCode = 33`, sincronize esse valor no EAS antes do primeiro build automatizado:

```bash
eas build:version:set
```

Quando o CLI perguntar:

- plataforma: `Android`
- migrar para remote version source: `yes`
- versao inicial: `33`

Depois disso, o proximo build de producao deve subir para `34` automaticamente.

Obs.: esta inicializacao ja foi executada neste ambiente com o valor `33`.

## Fluxos de uso

### 1. Build apenas

```bash
npm run eas:build:android
```

### 2. Build + envio automatico para teste interno

```bash
npm run release:android:internal
```

### 3. Pegar o ultimo build pronto e enviar para teste interno

```bash
npm run eas:submit:android
```

### 4. Build + envio para producao publica

Use somente quando as credenciais estiverem validadas e voce realmente quiser publicar:

```bash
npm run release:android:play
```

## Se der erro, o que normalmente significa

- `invalid_grant`, `permission denied`, `caller does not have permission`
  - a Service Account nao foi adicionada corretamente na Play Console ou nao recebeu permissao suficiente
- `You need to upload manually at least once`
  - a primeira publicacao do app na Play precisa ser manual
- `wrong key` ou erro de assinatura
  - o keystore atual do EAS nao bate com a upload key aceita pela Play Console

## Informacoes que ainda podem ser necessarias

Se a automacao ainda falhar, as informacoes mais uteis para diagnostico sao:

- o erro exato do `eas submit`
- se a conta Expo esta autenticada no projeto certo
- se a Service Account ja foi criada
- se a service account `play-submit-scania-clube@rise-371313.iam.gserviceaccount.com` ja recebeu acesso na Play Console
- se o app na Play usa a mesma upload key do EAS
- se voce quer automatizar envio para `internal` ou direto para `production`
