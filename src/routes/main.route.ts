import { Router, Request, Response } from "express";
import { SequelizeHelper } from "../orm/SequelizeHelper";
import { Orm, OrmHelper } from "../types/main";

const apiRouter = Router();

/* should contain helpers for all supported orms */
const ormHelpers: { [key in Orm]: OrmHelper } = {
  sequelize: new SequelizeHelper(),
};

/* will return description of all model tables to frontend */
apiRouter.get("/model-infos/", (req: Request, res: Response) => {
  const ormHelper = ormHelpers[appOrm];
  const modelInfos = ormHelper.extractModelInfo();
  return res.send(modelInfos);
});

/* will return values that can be used as values for relation in model */
apiRouter.post(
  "/model-values/:modelName/",
  async (req: Request, res: Response) => {
    const ormHelper = ormHelpers[appOrm];
    try {
      const allOptions = await ormHelper.getAll(req.params.modelName);
      return res.send(allOptions);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

export default apiRouter;
