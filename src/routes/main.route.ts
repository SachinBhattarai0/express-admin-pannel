import { Router, Request, Response } from "express";
import { sendError } from "../utils/response";
import { SequelizeHelper } from "../orm/SequelizeHelper";
import { Orm, OrmHelper } from "../types/main";
import { paginator } from "../utils/paginator";
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

      if (req.body.paginate) {
        return res.json(paginator(allOptions, req.query.page as string));
      }
      return res.json(allOptions);
    } catch (error) {
      return sendError(res, error as Error);
    }
  }
);

/* will delete all tabel values matching given values and returns new value */
apiRouter.post("/delete/:modelName", async (req: Request, res: Response) => {
  const ormHelper = ormHelpers[appOrm];
  const modelName = req.params.modelName;
  try {
    const itemsCount = await ormHelper.delete(modelName, {
      ...req.body.where,
    });
    const newValues = await ormHelper.getAll(modelName);
    return res.json({
      message: `Deleted ${itemsCount} item${
        itemsCount > 1 ? "s" : ""
      } Successfully!`,
      newValues,
    });
  } catch (error) {
    return sendError(res, error as Error);
  }
});

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
    return sendError(res, error as Error);
  }
});

export default apiRouter;
