import { Express } from "express";
import { ModelAttributeColumnReferencesOptions, Sequelize } from "sequelize";

export type ServerApp = Express;
export type Db = Sequelize; /* or any other with union types */
export type Orm = "sequelize"; /* or any other with union types */

export interface ModelInfos {
  tableName: string;
  fields: ModelInfo[];
  /* associations means to which other models refrences this model */
  associations?: (associationInfo | undefined)[];
}

export type associationInfo = {
  model: string;
  associationType: "oneToOne" | "oneToMany" | undefined;
};

/* modelinfos which can be used by frontend to make form for the model */
export interface ModelInfo {
  type: "string" | "date" | "number" | "text" | "boolean" | undefined;
  fieldName: string;
  allowNull?: boolean;
  defaultValue?: string;

  /* relationWith means to which models this model refrence*/
  relationWith?:
    | string
    | ModelAttributeColumnReferencesOptions /* { model: string; key: string }[] */
    | undefined;
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
