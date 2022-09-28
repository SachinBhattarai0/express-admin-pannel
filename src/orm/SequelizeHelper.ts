import { ModelInfo, ModelInfos, OrmHelper } from "../types/main";
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
        };
      }
    );
  }

  async getAll(modelName: string): Promise<{ [key: string]: any }> {
    const model = dbInstance.models[modelName];
    if (!model) throw new Error("invalid model name");
    return model.findAll();
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
          //   relationType:
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
}
