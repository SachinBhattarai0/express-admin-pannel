import React from "react";
import { ModelInfo } from "../types/main";
import { PrimitiveFieldTypes } from "../types/main";
import Input from "../components/Form/Input";
import Textarea from "../components/Form/Textarea";

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

// const relationFieldTypes = {
//   select: (name: string, options: { name: string; value: string }[]) => (
//     <Select name={name} options={options} />
//   ),

// }

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
    return <div></div>;
  }
}
