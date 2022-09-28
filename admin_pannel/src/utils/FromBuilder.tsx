import React from "react";
import { ModelInfo } from "../types/main";
import { PrimitiveFieldTypes, relationModel } from "../types/main";
import Input from "../components/Form/Input";
import Textarea from "../components/Form/Textarea";
import Select from "../components/Form/Select";

const primitiveFieldTypes: PrimitiveFieldTypes = {
  string: (name, defaultValue) => (
    <Input name={name} defaultValue={defaultValue} />
  ),
  number: (name, defaultValue) => (
    <Input type="number" name={name} defaultValue={defaultValue} />
  ),
  date: (name, defaultValue) => (
    <Input type="date" name={name} defaultValue={defaultValue} />
  ),
  text: (name, defaultValue) => (
    <Textarea name={name} defaultValue={defaultValue} />
  ),

  boolean: (name, defaultValue) => (
    <Input type="checkbox" name={name} defaultValue={defaultValue} />
  ),
};

export class FromBuilder {
  constructor(public optionsFetchUrl: string) {}

  generateField(fields: ModelInfo[] | undefined): React.ReactElement {
    return (
      <>
        {fields?.map((fieldInfo, index) => {
          if (fieldInfo.type && !fieldInfo.relationWith) {
            return (
              <div key={index}>{this.generatePrimitiveField(fieldInfo)}</div>
            );
          } else if (fieldInfo.relationWith) {
            return (
              <div key={index}>{this.generateRelationField(fieldInfo)}</div>
            );
          }
        })}
      </>
    );
  }

  generatePrimitiveField(fieldInfo: ModelInfo): React.ReactElement | undefined {
    if (!fieldInfo.type) return;
    return primitiveFieldTypes[fieldInfo.type](
      fieldInfo.fieldName,
      fieldInfo.defaultValue
    );
  }

  generateRelationField(fieldInfo: ModelInfo): React.ReactElement | undefined {
    if (!fieldInfo.relationWith?.options) return;
    const options: relationModel[] = fieldInfo.relationWith!.options.map(
      (item) => {
        console.log(item);
        const key = fieldInfo.relationWith!.key;
        return { name: "asdf", value: item[key] };
      }
    );

    return (
      <Select
        name={fieldInfo.fieldName}
        defaultValue={fieldInfo.defaultValue}
        options={options}
      />
    );
  }
}
