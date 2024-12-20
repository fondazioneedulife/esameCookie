import Router from "@koa/router";
import { Status, StatusPayload } from "../../api/index";
import { hasReachedThreshold } from "../services/bucket";
import { getRecipient } from "../services/user";
import { AuthenticatedContext } from "../types/session";
import { authMiddleware } from "./auth";

// Aggiungi un array di destinatari (o sostituiscilo con un database se necessario)
let extractedRecipient: { userId: string; recipient: string } | null = null; // Variabile per memorizzare destinatari estratti

const router = new Router<unknown, AuthenticatedContext>({
  prefix: "/api",
});

router.use(authMiddleware()); // Usa il middleware di autenticazione

/**
 * GET /status : return WAIT | PLAY | DONE
 *  - WAIT: attendi, non ci sono abbastanza iscritti
 *  - PLAY: puoi estrarre il destinatario
 *  - DONE: destinatario già estratto
 *  - 401 UNAUTHORIZED: sessione scaduta
 */
router.get("/status", async (ctx) => {
  let status: Status;

  // Verifica se l'utente è autenticato
  if (!ctx.session || !ctx.session.user) {
    ctx.status = 401;
    ctx.body = { message: "Sessione scaduta, vai al login" };
    return;
  }

  // Verifica se è stato raggiunto il numero sufficiente di iscritti
  if (await !hasReachedThreshold()) {
    status = "WAIT";
  } else {
    // Verifica se il destinatario è già stato estratto per l'utente corrente
    const recipient = await getRecipient(ctx.session.user._id);

    if (recipient) {
      status = "DONE"; // Destinatario già estratto
    } else {
      status = "PLAY"; // L'utente può estrarre un destinatario
    }
  }

  // Restituisci lo stato
  ctx.body = { status } as StatusPayload;
});

/**
 * POST /extract : Estrai il destinatario
 * - Se il destinatario è già stato estratto, lo restituisce
 * - Se non è stato estratto, lo estrae e lo memorizza
 */
router.post("/extract", async (ctx) => {
  const userId = ctx.session.user._id;


  if (extractedRecipient && extractedRecipient.userId === userId) {
    ctx.body = { recipient: extractedRecipient.recipient };
    return;
  }


  const getRandomRecipient = () => {
    const recipients = ["Alice", "Bob", "Charlie", "David", "Eve"];
    return recipients[Math.floor(Math.random() * recipients.length)];
  };


  const recipient = getRandomRecipient();
  extractedRecipient = { userId, recipient };


  ctx.body = { recipient };
});

export default router;
