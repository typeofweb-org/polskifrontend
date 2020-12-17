# Polski Frontend

## Dev

Uruchom `yarn dev`. Gdy serwer będzie już gotowy, to w drugim oknie terminala odpal:

```bash
docker exec -i polskifrontend-monorepo_typeofweb_polskifrontend_1 psql polskifrontend -U postgres < DUMP.sql
```
