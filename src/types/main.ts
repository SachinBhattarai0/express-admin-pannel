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
  getAll: (modelName: string) => Promise<AnyObj[]>;

  /*
    this method should behave in two ways:
    if whereFields if just one object.eg: whereFields={name:'sachin',age:12}
      then should delete all items from model that has (name='sachin' and age='12')

    if whereFields is array of objects.eg: whereFields=[{name:'sachin',age:12},{address:'damak'}]
      then should loop over each object and delete all items from model where first (name='sachin' and age='12') and second item that have (address='damak')

    NOTE: this method should always return as single promise using Promise.all()
          for more info se delete method of SequelizeHelper
    */
  delete: (modelName: string, whereFields: AnyObj | AnyObj[]) => Promise<any>;

  //
  createOne: (modelName: string, body: object) => Promise<any>;
}

// options that can be passed while creating instance of AdminPannel
export interface AdminPannelOptions {
  /* 
  titleFields are set of fields for each model whose value will be shown in admin pannel
  titleFields:{model1:["id","name"],model2:["field1","field2"]}
   */
  titleFields?: { [key: string]: string[] };

  /* if some field contain a url to a image and you want to show it as a image in admin pannel then
  declare the field in here eg: imageFields = {model1:['photo'],model2:['profileImg','siteImg']} */
  imageFields?: { [key: string]: string[] };

  /* no of items to show per page. If no of item in page exceeds given value then pagination will be shown */
  noOfItemsPerPage?: number;
}
