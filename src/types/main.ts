import { Express } from "express";
import { ModelAttributeColumnReferencesOptions, Sequelize } from "sequelize";

export type ServerApp = Express;
export type Db = Sequelize; /* or any other with union types */
export type Orm = "sequelize"; /* or any other with union types */

export interface ModelInfos {
  tableName: string;
  fields: ModelInfo[];
}

/* modelinfos which can be used by frontend to make form for the model */
export interface ModelInfo {
  type: "string" | "date" | "number" | "text" | "boolean" | undefined;
  fieldName: string;
  allowNull?: boolean;
  defaultValue?: string;
  relationWith?: string | ModelAttributeColumnReferencesOptions | undefined;
  refrences?: { model: string; key: string }[];

  //associations
  associationType?:
    | "oneToOne"
    | "oneToMany" /* relationType is not the actual relations between models */;
}

/*
 Orm helpers are those class which contain orm specific methods to perform various 
 operations like extracting model info.
 All orm helper must implement OrmHelper class
*/
export interface OrmHelper {
  extractModelInfo: () => ModelInfos[];
  /* should return all datas in the given model */
  getAll: (modelName: string) => Promise<{
    [key: string]: any;
  }>;
}
