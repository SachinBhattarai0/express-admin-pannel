import { Db, ServerApp, Orm, AdminPannelOptions } from "./types/main";
import apiRoutes from "./routes/main.route";
import adminPannelroute from "./routes/adminpannel.route";
import { AdminPannelOptionsValidator } from "./utils/AdminPannelOptionsValidator";
import cors from "cors";
import express from "express";
import path from "path";

/* custom global types */
declare global {
  var dbInstance: Db; /* dbInstance */
  var appInstance: ServerApp; /* express app */
  var appOrm: Orm; /* name of the orm used */
  var AdminPannelOptions:
    | AdminPannelOptions
    | undefined; /* options that user specified for customizing admin pannel */
}

export class AdminPannel {
  constructor(
    public orm: Orm,
    public db: Db,
    public app: ServerApp,
    public options?: AdminPannelOptions
  ) {}

  initialize(route: string): void {
    /* declaring global variables */
    global.dbInstance = this.db;
    global.appInstance = this.app;
    global.appOrm = this.orm;
    global.AdminPannelOptions = this.options;

    /* should be implemented by one using ligrary */
    // this.app.use(cors())
    // this.app.use(express.json())
    // app.use(express.urlencoded({ extended: true }))

    //if user passed extra options then validating the options
    if (this.options) this.validateOptions(this.options);

    /* static files for admin pannel wil be served thouuth this derectory */
    this.app.use(express.static(path.join(__dirname, "../", "public")));

    /* routes for api */
    this.app.use(`/${route}/backend`, apiRoutes);
    /* routes toServe admin pannel */
    this.app.use(`/${route}`, adminPannelroute);
  }

  /* pretty complex method but all it does is it validates whether the options provided in AdminPannel options are valid or not */
  validateOptions(options: AdminPannelOptions) {
    if (options.titleFields) {
      AdminPannelOptionsValidator.validateModelToPropertyFields(
        options.titleFields
      );
    }
    if (options.imageFields) {
      AdminPannelOptionsValidator.validateModelToPropertyFields(
        options.imageFields
      );
    }
  }
}
