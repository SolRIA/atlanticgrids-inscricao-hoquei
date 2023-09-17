# Quasar App (inscricao-clubes-hoquei)

A Quasar Project

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### Supabase query

```SQL
select
  i.created_at AT TIME ZONE 'Europe/Lisbon' as "criado",
  i.nome_pessoa,
  c.nome as "cargo",
  cb.nome as "clube"
from
  inscritos i
  inner join cargos c on c.id = i.cargo_id
  inner join clubes cb on cb.id = i.clube_id;
```
