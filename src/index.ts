import { Db, ServerApp, Orm } from "./types/main";
import apiRoutes from "./routes/main.route";
import adminPannelroute from "./routes/adminpannel.route";
import express from "express";
import path from "path";

/* custom global types */
declare global {
  var dbInstance: Db; /* dbInstance */
  var appInstance: ServerApp; /* express app */
  var appOrm: Orm; /* name of the orm used */
}

export class AdminPannel {
  constructor(public orm: Orm, public db: Db, public app: ServerApp) {}

  initialize(route: string): void {
    /* declaring global variables */
    global.dbInstance = this.db;
    global.appInstance = this.app;
    global.appOrm = this.orm;

    /* static files for admin pannel wil be served thouuth this derectory */
    this.app.use(express.static(path.join(__dirname, "../", "public")));

    /* routes for api */
    this.app.use(`/${route}/backend`, apiRoutes);
    /* routes toServe admin pannel */
    this.app.use(`/${route}`, adminPannelroute);
  }
}
