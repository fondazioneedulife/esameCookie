import Router from "@koa/router";
import { Status, StatusPayload } from "../../api/index";
import { hasReachedThreshold } from "../services/bucket";
import { getRecipient } from "../services/user";
import { AuthenticatedContext } from "../types/session";
import { authMiddleware } from "./auth";
import { extract } from "../services/bucket";

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

router.post('/extract', async (ctx) => {
  ctx.accepts("json");
  // const userExtracted = await extract(ctx.params._id);
  const userExtracted = await extract(ctx.session.user._id);

  ctx.response.body = userExtracted;
});

router.get("/recipient", async (ctx) => {
  let recipient = await getRecipient(ctx.session.user._id);

  if(recipient){
    ctx.body = recipient;
  } else {
    // destinatario non ancora estratto
    ctx.status = 400;
    return;
  }
});

export default router;
