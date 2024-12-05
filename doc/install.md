# Istallazione

- fai un **fork** del progetto github sul tuo profilo personale
- clona il repository dal tuo profilo personale
- quando hai scaricato il repository, esegui `npm install`
- crea un nuovo branch di lavoro

---

Questo progetto è un **monorepo** che contiene 2 applicazioni:

- **backend**: applicazione server che contiene la business logic, realizzata utilizzando il framework node.js [Koa](https://koajs.com/). Questa applicazione gestisce il database (MongoDB) ed espone api al frontend
- **frontend**: single page application realizzata in [React](https://react.dev/), [Typescript](https://www.typescriptlang.org/) utilizzando lo scaffolding di [Vite](https://vite.dev/)

L'installazione di tutte le dipendenze si effettua lanciando il comando: `npm install` dalla directory principale del progetto.

## Connessione al database

Il database su cui è sviluppata l'applicazione è **MongoDB**, a cui ci si connette tramite la libreria _mongoose_. Per avviare il database, **puoi utilizzare il tuo database locale**, oppure **avviarlo con docker**, digitando il comando `docker compose up -d` dalla directory di questo progetto.

La connessione è impostata sui parametri di default `mongodb://localhost:27017/secretsanta`.

# Run

Per avviare il progetto:

- assicurati che il database sia attivo
- in due terminali diversi, lancia i comandi:
  - `npm run dev -w frontend`
  - `npm run dev -w backend`
