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

- `yarn` w wersji co najmniej 1.22.x, ale mniejszej niż 2.x.x
- Docker i polecenie `docker-compose`

## Praca lokalna

Przed przystąpieniem do pracy należy skopiować plik `.env-sample` do `.env`.
Projekt uruchamiamy jednym poleceniem `yarn dev`. Spowoduje ono instalację wszystkich potrzebnych zależności, uruchomienie kontenera w Dockerze oraz nasze aplikacji.
Po chwili powinna być gotowa pod adresem http://localhost:3000/

### Uwaga co do Supabase

Przy pierwszym uruchomieniu, możesz zobaczyć komunikat mówiąc o braku Supabase. W takim przypadku uruchom polecenie `yarn supabase init` i zatwierdź domyślne opcje wciskając 3xenter. Po dłuższej chwili na ekranie zobaczysz 5 wartości:

- Supabase URL
- Supabase Key (anon, public)
- Supabase Key (service_role, private)
- Database URL
- Email testing interface URL

Koniecznie skopiuj je do swojego pliku `.env` odpowiednio:

- Supabase URL jako `NEXT_PUBLIC_SUPABASE_URL`
- Supabase Key (anon, public) jako `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Database URL jako `DATABASE_URL` i `DATABASE_POOL_URL`
- Supabase Key (service_role, private) oraz Email testing interface URL nie będą potrzebne

Następnie ponownie odpal `yarn dev`.

## Przywracanie danych z DUMP.sql

Gdy wszystko będzie już gotowe, to w drugim oknie terminala należy wpisać polecenie:

```bash
docker exec -i supabase-db psql postgres -U postgres < DUMP.sql
```

Spowoduje to załadowanie danych do bazy z pliku DUMP.sql.

## Konwencje

Większość konwencji w projekcie jest wymuszona przez `prettier` i/lub `eslint` oraz TypeScripta.

Ważna uwaga odnośnie tworzenia Pull Requestów: Od 29. grudnia korzystamy z "Conventional Commits", aby łatwiej nam było generować CHANGELOG. **Nazwy commitów mogą być dowolne**, ale **tytuł samego PR-a musi spełniać określone wymagania**! Więcej informacji oraz przykłady można znaleźć tutaj: https://highlab.pl/conventional-commits/

**Tytuły i opisy PR-ów piszemy w języku polskim!**
