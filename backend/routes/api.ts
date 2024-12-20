import Router from "@koa/router";
import { Status, StatusPayload } from "../../api/index";
import { extract, hasReachedThreshold } from "../services/bucket";
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

router.post("/extract", async (ctx) => {
  console.log("Route POST /extract");
  try {
    // Verifica se l'utente è autenticato
    const userId = ctx.session.user._id;
    const recipient = await extract(userId);
    ctx.body = recipient;
  } catch (error) {
    console.error("Errore nella route POST /extract:", error);
    ctx.status = 500;
    ctx.body = { error: "Errore interno del server." };
  }
});





export default router;
