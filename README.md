# Vuetify App

Frontend Vue 3 + Vuetify standalone untuk starter dashboard/admin personal. Project ini memakai JavaScript, Pinia, Axios interceptors, file-based routing, global loading/error/snackbar, reusable CRUD components, dan integrasi API Express.

## Stack

- Vue 3 + Vite
- JavaScript, bukan TypeScript
- Vuetify
- Pinia
- Axios
- Vue Router file-based routes
- Vue I18n
- MDI icons
- Import alias `@/` ke `src`

## Setup

```sh
npm install
cp .env.example .env
```

Isi `.env`:

```txt
VITE_API_BASE_URL=http://localhost:3001/api
```

Variable frontend Vite wajib memakai prefix `VITE_`.

## Development

```sh
npm run dev
```

Default dev URL Vite:

```txt
http://localhost:3000
```

## Scripts

- `npm run dev` - start Vite dev server.
- `npm run build` - production build.
- `npm run preview` - preview hasil build.
- `npm run build-only` - alias build.
- `npm run lint` - jalankan ESLint.
- `npm run lint:fix` - jalankan ESLint fix.
- `npm run mcp` - apply Vuetify MCP/ruler config.
- `npm run mcp:revert` - revert Vuetify MCP/ruler config.

## Struktur

```txt
src/
  api/
  components/
  config/
  layouts/
  pages/
  plugins/
  stores/
  styles/
  utils/
```

File penting:

- `src/main.js` - entry app.
- `src/App.vue` - root component dan global UI.
- `src/api/index.js` - Axios instance dan interceptors.
- `src/layouts/default.vue` - authenticated layout.
- `src/router/index.js` - setup file-based routes dan auth guard.
- `src/plugins/vuetify-defaults.js` - default props Vuetify.
- `src/styles/settings.scss` - Sass settings Vuetify.

## Reusable Components

- `AppBreadcrumbs.vue` - breadcrumb compact.
- `AppTable.vue` - wrapper `v-table` dengan loading skeleton.
- `DataToolbar.vue` - toolbar list dengan search, limit, filter, refresh, create.
- `AppFilterDrawer.vue` - drawer filter global via `appStore`.
- `AppFormDialog.vue` - dialog form create/edit.
- `AppConfirmDialog.vue` - dialog konfirmasi.
- `WidgetCard.vue` - card dashboard widget.

## Store Pattern

Gunakan Pinia options store. Page sebaiknya tipis dan logic API berada di store.

Pola module CRUD:

```txt
items, meta, params
form, idEdit, dialog, dialogDelete
getData, getMeta, saveData, delData
```

Global UI state ada di `src/stores/app.js`:

- loading dialog
- table loading
- snackbar
- error dialog
- filter drawer

## API Integration

Base API diambil dari:

```js
import.meta.env.VITE_API_BASE_URL
```

Fallback default:

```txt
http://localhost:3001/api
```

Axios interceptor otomatis:

- membersihkan params kosong
- mengatur loading global
- menampilkan snackbar sukses untuk mutasi
- menampilkan error dialog untuk error API

## Routing

Routes dibaca dari `src/pages/*.vue`.

- `/login` tidak memakai default layout.
- Route lain memakai `src/layouts/default.vue`.
- Auth guard memanggil `auth.fetchUser()` sebelum masuk halaman protected.

## Styling

- Utamakan props dan utility bawaan Vuetify.
- Global defaults komponen ada di `src/plugins/vuetify-defaults.js`.
- Sass variables Vuetify ada di `src/styles/settings.scss`.
- Hindari CSS manual kecuali memang diperlukan.

## Build

```sh
npm run build
```

Hasil build ada di:

```txt
dist/
```
