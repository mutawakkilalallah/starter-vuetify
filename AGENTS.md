# AGENTS.md

Panduan untuk AI agent yang bekerja di folder `vuetify-app`.

## Stack

- JavaScript, bukan TypeScript.
- Vue 3 + Vite.
- Vuetify untuk UI.
- Pinia untuk state management.
- Axios untuk API client.
- File-based router dari Vue Router auto routes.
- Import internal memakai alias `@/` ke `src`.

## Prinsip UI

- Utamakan komponen dan utility bawaan Vuetify.
- Jangan menambah CSS manual kecuali benar-benar perlu dan disetujui user.
- Jangan membuat landing page untuk fitur app; langsung buat halaman kerja yang usable.
- Style sederhana, rapi, dan cocok untuk dashboard/admin personal.
- Gunakan icon MDI/Vuetify untuk tombol aksi.

## Struktur Penting

- `src/pages/` untuk file route.
- `src/layouts/default.vue` untuk layout authenticated app.
- `src/stores/` untuk Pinia stores.
- `src/components/` untuk komponen reusable.
- `src/api/index.js` untuk Axios instance dan interceptors.
- `src/config/` untuk app/menu config.
- `src/utils/` untuk formatter/helper frontend.

## Pola Store

- Gunakan Pinia options store, konsisten dengan `notes`.
- Page sebaiknya tipis: binding state dan trigger action store.
- Logic API taruh di store, bukan langsung di page.
- Untuk CRUD baru, ikuti pola:
  - `items`, `meta`, `params`
  - `form`, `idEdit`, `dialog`, `dialogDelete`
  - `getData`, `getMeta`, `saveData`, `delData`
- Global loading, snackbar, error dialog, dan filter drawer ada di `appStore`.

## Komponen Reusable

- Gunakan `DataToolbar.vue` untuk toolbar list.
- Gunakan `AppTable.vue` untuk table berbasis `v-table`.
- Gunakan `AppFormDialog.vue` untuk dialog create/edit.
- Gunakan `AppConfirmDialog.vue` untuk confirm delete.
- Gunakan `AppFilterDrawer.vue` lewat `appStore.openFilterDrawer()`, jangan import langsung ke page.
- Gunakan `AppBreadcrumbs.vue` untuk breadcrumb compact.

## API dan Env

- Base API ada di `src/api/index.js`.
- Env frontend harus pakai prefix `VITE_`.
- Contoh dev env: `VITE_API_BASE_URL=http://localhost:3001/api`.
- Jangan hardcode API URL di page/store.
- Jangan hardcode options form/filter jika sudah tersedia dari backend.

## Vuetify Defaults

- Default props global ada di `src/plugins/vuetify-defaults.js`.
- Jika ingin mengubah style global komponen Vuetify, ubah defaults atau `src/styles/settings.scss`.
- Jangan override class Vuetify secara manual jika masih bisa pakai props/defaults.

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Fix lint: `npm run lint:fix`

## Batasan

- Jangan membuat file `.ts`.
- Jangan disable ESLint rule untuk masalah kecil; lebih baik ikuti style rule.
- Custom event di template gunakan kebab-case, contoh `update:model-value`.
- Jangan menjalankan build/check jika user meminta tidak menjalankannya.
- Jangan mengubah tampilan besar tanpa permintaan user.
