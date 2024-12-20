import Router from "@koa/router";
import { Status, StatusPayload } from "../../api/index";
import { hasReachedThreshold } from "../services/bucket";
import { getRecipient, saveRecipient } from "../services/user";  // Funzione che salva il destinatario estratto
import { AuthenticatedContext } from "../types/session";
import { authMiddleware } from "./auth";

const router = new Router<unknown, AuthenticatedContext>({
  prefix: "/api",
});

router.use(authMiddleware());

/**
 * GET /status : return WAIT | PLAY | DONE
 * - WAIT: attendi, non ci sono ancora abbastanza iscritti;
 * - PLAY: puoi estrarre il destinatario;
 * - DONE: destinatario già estratto
 * - 401 UNAUTHORIZED: sessione scaduta, vai a login
 */
router.get("/status", async (ctx) => {
  let status: Status;
  
  // Se non è stato raggiunto il numero minimo di iscritti
  if (await !hasReachedThreshold()) {
    status = "WAIT";
  } else {
    // Verifica se esiste un destinatario
    const recipient = await getRecipient(ctx.session.user._id);

    if (recipient) {
      status = "DONE";  // Se il destinatario è già estratto
    } else {
      status = "PLAY";  // Se l'utente può ancora estrarre il destinatario
    }
  }

  ctx.body = { status } as StatusPayload;
});


router.post("/extract", async (ctx) => {
  // Controlla se lo stato è "PLAY"
  const status = await hasReachedThreshold() ? "PLAY" : "WAIT";
  if (status !== "PLAY") {
    ctx.status = 400;
    ctx.body = { message: "Non puoi estrarre il destinatario in questo momento." };
    return;
  }

  // Estrai il destinatario
  const recipient = await getRecipient(ctx.session.user._id);

  if (recipient) {
    // Se il destinatario è già stato estratto, rispondi con un errore
    ctx.status = 400;
    ctx.body = { message: "Il destinatario è già stato estratto." };
  } else {
    // Salva il destinatario estratto
    const newRecipient = await saveRecipient(ctx.session.user._id);

    if (newRecipient) {
      ctx.status = 200;
      ctx.body = { recipient: newRecipient };
    } else {
      ctx.status = 500;
      ctx.body = { message: "Errore nell'estrazione del destinatario." };
    }
  }
});

export default router;
