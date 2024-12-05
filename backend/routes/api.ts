import Router from "@koa/router";

const router = new Router({
  prefix: "/api",
});

/**
 * GET /status : return WAIT | PLAY | DONE  - invocata sempre dopo il login
 * - WAIT: attendi, non ci sono ancora abbastanza iscritti;
 * - PLAY: puoi estrarre il destinatario;
 * - DONE: destinatario già estratto
 * - 401 UNAUTHORIZED: sessione scaduta, vai a login
 */
router.get("/status", (ctx, next) => {
  // ...
});

/**
 * POST /extract : estrae un destinatario e lo ritorna.
 * Se il destinatario è giò stato estratto, ritorna l'estrazione precedente (non dà errore)
 */
router.post("/extract", (ctx, next) => {
  // ...
});

/**
 * GET /recipient : mostra il destinatario estratto in precedenza.
 * Ritorna un 400 se il destinatario non è stato già estratto e l'utente viene redirezionato alla pagina di estrazione
 */
router.get("/recipient", (ctx, next) => {
  // ...
});

export default router;
