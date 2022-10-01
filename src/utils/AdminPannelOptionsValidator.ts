export class AdminPannelOptionsValidator {
  constructor() {}

  /*
   this method will validate whether options geven as modelName and its property exists in the model 

   the argument 'fields' will be something like:
            {modelName1:['field1','field2'],modelName2:['id','image']}

    now the method will loop over each modelName and check if the provided modelNmme exists or not
    and also will validate if properties specifeed exists in the model or not
  */
  static validateModelToPropertyFields(fields: { [key: string]: string[] }) {
    Object.entries(fields).map(([modelName, modelFields]) => {
      if (!dbInstance.models[modelName])
        throw new Error(`model with name ${modelName} does not exist!`);
      const model = dbInstance.models[modelName].getAttributes();
      modelFields.forEach((field) => {
        if (!(field in model))
          throw new Error(`${field} does not exis on model ${modelName}`);
      });
    });
  }
}
