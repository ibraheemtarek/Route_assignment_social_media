import express from "express";
import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import authController from "./Auth/auth.controller.js";
import globalErrHandler from "./Middlewares/globalErr.middleware.js";
import { PORT } from "./config/config.service.js";
import testDBConnection from "./DB/connection.js";
async function bootstrap() {
  const app: express.Express = express();
  const port = PORT || 3000;
  app.use(express.json());

  await testDBConnection();

  app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    res.status(200).send("landing page");
  });

  app.use("/auth", authController);

  app.use(
    "/*dummy",
    (req: Request, res: Response, next: NextFunction): void => {
      res.status(404).json({ msg: "invalid URL or METHOD" });
    },
  );

  app.use(globalErrHandler);

  app.listen(port, () => {
    console.log(`app running on port ${port}`);
  });
}

export default bootstrap;
