# Polski Frontend - pomoc mile widziana!

## Issues
Zachęcamy do otwierania Issues ze znalezionymi bugami i z sugestiami tego, co można poprawić.

## Stack technologiczny
- TypeScript
- Next.js (SSG, ISG)
- PostgreSQL
- Prisma
- Docker
- Vercel

## Wymagania
- `yarn` w wersji co najmniej 1.22.x, ale mniejszej niż 2.x.x
- Docker i polecenie `docker-compose`

## Praca lokalna
Projekt uruchamiamy jednym poleceniem `yarn dev`. Spowoduje ono instalację wszystkich potrzebnych zależności, uruchomienie kontenera w Dockerze oraz nasze aplikacji.
Po chwili powinna być gotowa pod adresem http://localhost:3000/

Gdy wszystko będzie już gotowe, to w drugim oknie terminala należy wpisać polecenie:

```bash
docker exec -i polskifrontend_typeofweb_polskifrontend_1 psql polskifrontend -U postgres < DUMP.sql
```

Spowoduje to załadowanie danych do bazy z pliku DUMP.sql.

## Konwencje
Większość konwencji w projekcie jest wymuszona przez `prettier` i/lub `eslint` oraz TypeScripta.

Ważna uwaga odnośnie tworzenia Pull Requestów: Od 29. grudnia korzystamy z "Conventional Commits", aby łatwiej nam było generować CHANGELOG. **Nazwy commitów mogą być dowolne**, ale **tytuł samego PR-a musi spełniać określone wymagania**! Więcej informacji oraz przykłady można znaleźć tutaj: https://highlab.pl/conventional-commits/

**Tytuły i opisy PR-ów piszemy w języku polskim!**
