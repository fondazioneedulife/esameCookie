import Router from "@koa/router";
import { Status, StatusPayload } from "../../api/index";
import { hasReachedThreshold } from "../services/bucket";
import { extract } from "../services/bucket";
import { getRecipient } from "../services/user";
import { AuthenticatedContext } from "../types/session";
import { authMiddleware } from "./auth";

const router = new Router<unknown, AuthenticatedContext>({
  prefix: "/api",
});

router.use(authMiddleware());

/**
 * GET /status : return WAIT | PLAY | DONE  - invocata sempre dopo il login
 * - WAIT: attendi, non ci sono ancora abbastanza iscritti;
 * - PLAY: puoi estrarre il destinatario;
 * - DONE: destinatario già estratto
 * - 401 UNAUTHORIZED: sessione scaduta, vai a login
 */
router.get("/status", async (ctx) => {
  let status: Status;
  if (await !hasReachedThreshold()) {
    status = "WAIT";
  }

  const recipient = await getRecipient(ctx.session.user._id);

  if (recipient) {
    status = "DONE";
  } else {
    status = "PLAY";
  }

  ctx.body = { status } as StatusPayload;
});



/* task 1 implemento l'api POST api/extract */

router.post("/extract", async (ctx) => {


  //Vado a richiamare la funzione extract che estrae il destinatario
  const recipient = await extract(ctx.session.user._id);

  //assegno al body la risposta con il destinatario estratto
  ctx.body = {recipient};
})


//implemento l'api recipient
router.post("/recipient", async (ctx) => {
  //Vado a richiamare la funzione getRecipient che mi estrae il destinatario
  const recipient = await getRecipient(ctx.session.user._id);

  //assegno al body la risposta con il destinatario estratto
  ctx.body = {recipient};
})
export default router;
