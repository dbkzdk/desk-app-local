# AppDesk Nuxt + SQLite

MVP portal aplikasi multi-tenant: login, isolasi tenant server-side, RBAC, pencarian aplikasi, favorite, recent, dan admin CRUD aplikasi.

## Jalankan
```bash
cp .env.example .env
npm install
npm run seed
npm run dev
```
Buka http://localhost:3000

Demo:
- Company Admin: `admin@alpha.test` / `Admin123!`
- User: `user@alpha.test` / `User123!`
- Tenant lain: `admin@beta.test` / `Admin123!`

## Catatan
SQLite cocok untuk MVP/single-instance. Untuk deployment multi-instance atau beban tulis tinggi, migrasikan ke PostgreSQL. Ganti session secret dan akun demo sebelum production.
