import { AnyObj, ModelInfo, ModelInfos, OrmHelper } from "../types/main";
import { DataType, DataTypes, Model, ModelStatic } from "sequelize";

declare module "sequelize" {
  export interface ModelAttributeColumnOptions {
    _autoGenerated?: boolean;
  }
}

export class SequelizeHelper implements OrmHelper {
  constructor() {}

  extractModelInfo(): ModelInfos[] {
    return Object.entries(dbInstance.models).map(
      ([tableName, model]): ModelInfos => {
        return {
          tableName: tableName,
          fields: this.getModelFieldInfo(model),
          primaryKeyFields: model.primaryKeyAttributes,
        };
      }
    );
  }

  async getAll(modelName: string): Promise<AnyObj[]> {
    const model = this.getModel(modelName);
    if (!model) throw new Error("invalid model name");
    return model.findAll();
  }

  async createOne(modelName: string, body: object) {
    const model = this.getModel(modelName);
    if (!model) throw new Error("invalid model name");
    return model.create({ ...body });
  }

  async delete(modelName: string, whereFields: AnyObj | AnyObj[]) {
    if (!Array.isArray(whereFields)) whereFields = [whereFields];
    const model = this.getModel(modelName);
    if (!model) throw new Error("invalid model name");

    return Promise.all(
      whereFields.map((whereField: AnyObj) =>
        model.destroy({ where: { ...whereField } })
      )
    );
  }

  async updateOne(modelName: string, pk: object, newValues: AnyObj) {
    const model = this.getModel(modelName);
    if (!model) throw new Error("invalid model name");

    const item = await model.findOne({ where: { ...pk } });
    console.log(pk);
    if (!item) throw new Error("no item matched given pk!!");

    Object.entries(newValues).forEach(([key, value]) =>
      item.setDataValue(key, value)
    );
    return item.save();
  }

  getModelFieldInfo(model: ModelStatic<Model>): ModelInfo[] {
    const modelAttributes = model.getAttributes();
    return Object.entries(modelAttributes)
      .map(([fieldName, fieldProperties]): ModelInfo | undefined => {
        if (fieldProperties.autoIncrement || fieldProperties._autoGenerated)
          return;
        return {
          type: this.getType(fieldProperties.type),
          fieldName: fieldName,
          allowNull: fieldProperties.allowNull,
          defaultValue: fieldProperties.defaultValue as string,
          relationWith: fieldProperties.references,
        };
      })
      .filter((i): i is ModelInfo => i !== undefined);
  }

  getType(typeInstance: DataType) {
    if (typeInstance instanceof DataTypes.BOOLEAN) return "boolean";
    if (typeInstance instanceof DataTypes.TEXT) return "text";
    if (typeInstance instanceof DataTypes.INTEGER) return "number";
    if (typeInstance instanceof DataTypes.DATE) return "date";
    if (typeInstance instanceof DataTypes.STRING) return "string";
  }

  getModel(modelName: string) {
    /* model name can be given as "s" in end or without an "s" in end */
    let model = dbInstance.models[modelName];
    if (!model) {
      model = dbInstance.models[modelName + "s"];
    }
    if (!model && modelName.endsWith("s")) {
      model = dbInstance.models[modelName.slice(0, -1)];
    }
    return model;
  }
}
