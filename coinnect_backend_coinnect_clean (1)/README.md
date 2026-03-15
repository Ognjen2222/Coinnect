# Coinnect Backend

Dieses Backend ist vollständig auf Coinnect ausgerichtet und enthält **keine Recipes-Logik**.

## Enthalten
- Prisma Schema mit `User`, `Group`, `GroupMember`, `Expense`, `ExpenseShare`, `Activity`
- Login und Registrierung
- JWT Auth
- Coinnect Demo-Daten
- Endpoints für Home, Gruppen, Verlauf und Profil

## Start

```bash
copy .env.example .env
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

## Demo Login
- E-Mail: `max@coinnect.at`
- Passwort: `Coinnect!2026#Demo`

## Wichtige Endpoints
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/home`
- `GET /api/groups`
- `POST /api/groups`
- `GET /api/activities`
- `GET /api/profile`
