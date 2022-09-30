import { Router, Request, Response } from "express";
import { request } from "http";
import { SequelizeHelper } from "../orm/SequelizeHelper";
import { Orm, OrmHelper } from "../types/main";

const apiRouter = Router();

/* should contain helpers for all supported orms */
const ormHelpers: { [key in Orm]: OrmHelper } = {
  sequelize: new SequelizeHelper(),
};

apiRouter.get("/admin-pannel-options/", (req: Request, res: Response) => {
  return res.json(AdminPannelOptions || {});
});

/* will return description of all model tables to frontend */
apiRouter.get("/model-infos/", (req: Request, res: Response) => {
  const ormHelper = ormHelpers[appOrm];
  const modelInfos = ormHelper.extractModelInfo();
  return res.json(modelInfos);
});

/* will return values that can be used as values for relation in model */
apiRouter.post(
  "/model-values/:modelName/",
  async (req: Request, res: Response) => {
    const ormHelper = ormHelpers[appOrm];
    try {
      const allOptions = await ormHelper.getAll(req.params.modelName);
      return res.json(allOptions);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400).json({ error: "unknown error occured" });
    }
  }
);

apiRouter.post("/create/:modelName/", async (req: Request, res: Response) => {
  const { modelName } = req.params;
  const ormHelper = ormHelpers[appOrm];
  console.log(req.body);
  try {
    const response = await ormHelper.createOne(modelName, { ...req.body });
    return res.json({
      message: `${modelName} created successfully!`,
      response,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: "unknown error occured" });
  }
});

export default apiRouter;
