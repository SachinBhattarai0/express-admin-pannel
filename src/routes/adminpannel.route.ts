import { Router, Request, Response } from "express";
import path from "path";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  // static files i.e build react app will be served through this route
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

export default router;
