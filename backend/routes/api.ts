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


router.post("/extract", async (ctx) => {
  const userId = ctx.session.user?._id;
  if (!userId) {
    ctx.throw(401, "Sessione non valida.");
  }

  try {
    const recipient = await extract(userId);
    ctx.body = { recipient };
  } catch (error) {
    ctx.throw(400, error.message);
  }
});

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

export default router;
