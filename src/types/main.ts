import { Express } from "express";
import { ModelAttributeColumnReferencesOptions, Sequelize } from "sequelize";

export type ServerApp = Express;
export type Db = Sequelize; /* or any other with union types */
export type Orm = "sequelize"; /* or any other with union types */

export interface ModelInfos {
  tableName: string;
  fields: ModelInfo[];
  primaryKeyFields: Readonly<string[]>;
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
export type AnyObj = { [key: string]: any };

/*
 Orm helpers are those class which contain orm specific methods to perform various 
 operations like extracting model info.
 All orm helper must implement OrmHelper class
*/
export interface OrmHelper {
  extractModelInfo: () => ModelInfos[];
  /* should return all datas in the given model */
  getAll: (modelName: string) => Promise<AnyObj>;

  /*this method will get a fields which whose matching value in table should be deleted.
  delets one or many values matching the given field values.
  this methods returns Promist that resolve to finds a value matching the given primary keys and delete it*/
  delete: (modelName: string, fields: AnyObj) => Promise<any>;

  createOne: (modelName: string, body: object) => Promise<any>;
}

// options that can be passed while creating instance of AdminPannel
export interface AdminPannelOptions {
  /* 
  titleFields are set of fields for each model whose value will be shown in admin pannel
  titleFields:{model1:["id","name"],model2:["field1","field2"]}
   */
  titleFields?: { [key: string]: string[] };
}
