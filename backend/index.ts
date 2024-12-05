import { bodyParser } from "@koa/bodyparser";
import cors from "@koa/cors";
import { createServer } from "http";
import Koa from "koa";
import session from "koa-session";
import serveStatic from "koa-static";
import apiRoutes from "./routes/api";
import authRoutes from "./routes/auth";

const app = new Koa();
const httpServer = createServer(app.callback());

app.use(cors({ credentials: true, origin: "*" })); // TODO: configure for production
app.use(bodyParser());
app.use(serveStatic(`./public`, {}));

app.keys = ["secret-ln9mLhYTd/kK(o.-inir"];
app.use(
  session(
    {
      key: "session",
      // secure: process.env.NODE_ENV === "production",
    },
    app,
  ),
);

app.use(authRoutes.routes()).use(authRoutes.allowedMethods());
app.use(apiRoutes.routes()).use(apiRoutes.allowedMethods());

httpServer.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.HOST}:${process.env.PORT}`);
});
