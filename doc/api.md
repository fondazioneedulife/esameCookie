# API

- `POST /auth/login`
- `POST /auth/register`
- `GET /api/status` : return "WAIT" | "PLAY" | "DONE" - invocata sempre dopo il login
  - WAIT: attendi, non ci sono ancora abbastanza iscritti; Viene visualizzata la schermata
  - PLAY: puoi estrarre il destinatario;
  - DONE: destinatario già estratto
  - 401 UNAUTHORIZED: sessione scaduta, vai a login
- `POST /api/extract` : estrae un destinatario e lo ritorna. Se il destinatario è giò stato estratto, ritorna l'estrazione precedente (non dà errore)
- `GET /api/recipient` : mostra il destinatario estratto in precedenza. Ritorna un 400 se il destinatario non è stato già estratto e l'utente viene redirezionato alla pagina di estrazione
