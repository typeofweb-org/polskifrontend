# Polski Frontend - pomoc mile widziana!

## Issues

Zachęcamy do otwierania Issues ze znalezionymi bugami i z sugestiami tego, co można poprawić.

## Stack technologiczny

- TypeScript
- Next.js (SSG, ISG)
- PostgreSQL (Supabase)
- Prisma
- Docker
- Vercel

## Wymagania

- `pnpm` w wersji co najmniej 7.17.0
- Docker i polecenie `docker compose`

## Praca lokalna

Przed przystąpieniem do pracy należy skopiować plik `.env-sample` do `.env`.
Projekt uruchamiamy jednym poleceniem `pnpm dev`. Spowoduje ono instalację wszystkich potrzebnych zależności, uruchomienie kontenera w Dockerze oraz naszej aplikacji.
Po chwili powinna być gotowa pod adresem http://localhost:3000/

### Uwaga co do Supabase

Przy pierwszym uruchomieniu, możesz zobaczyć komunikat mówiąc o braku Supabase. W takim przypadku uruchom polecenie `pnpm supabase init`. Następnie uruchom `pnpm supabase start`.

Użyj komendy `pnpm supabase status`, aby uzyskać dostęp do wartości, które następnie musisz skopiować do swojego pliku `.env`. Odpowiednio:

- `API URL` jako `NEXT_PUBLIC_SUPABASE_URL`
- `anon key` jako `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DB URL` jako `DATABASE_URL` oraz `DATABASE_POOL_URL`

Następnie odpal `pnpm dev`.

## Przywracanie danych z DUMP.sql

Gdy wszystko będzie już gotowe, to w drugim oknie terminala należy wpisać polecenie:

```bash
docker exec -i supabase_db_polskifrontend psql postgres -U postgres < DUMP.sql
```

Spowoduje to załadowanie danych do bazy z pliku DUMP.sql.

## Konwencje

Większość konwencji w projekcie jest wymuszona przez `prettier` i/lub `eslint` oraz TypeScripta.

Ważna uwaga odnośnie tworzenia Pull Requestów: korzystamy z "Conventional Commits", aby łatwiej nam było generować CHANGELOG. **Nazwy commitów mogą być dowolne**, ale **tytuł samego PR-a musi spełniać określone wymagania**! Więcej informacji oraz przykłady można znaleźć tutaj: https://highlab.pl/conventional-commits/

**Tytuły i opisy PR-ów piszemy w języku polskim!**
