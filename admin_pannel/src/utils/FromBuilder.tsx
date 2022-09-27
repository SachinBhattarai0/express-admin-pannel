import React from "react";
import { ModelInfo } from "../types/main";
import { PrimitiveFieldTypes } from "../types/main";
import Input from "../components/Form/Input";
import Textarea from "../components/Form/Textarea";

const primitiveFieldTypes: PrimitiveFieldTypes = {
  string: (name, index, defaultValue) => (
    <Input name={name} key={index} defaultValue={defaultValue} />
  ),
  number: (name, index, defaultValue) => (
    <Input type="number" name={name} key={index} defaultValue={defaultValue} />
  ),
  date: (name, index, defaultValue) => (
    <Input type="date" name={name} key={index} defaultValue={defaultValue} />
  ),
  text: (name, index, defaultValue) => (
    <Textarea name={name} key={index} defaultValue={defaultValue} />
  ),

  boolean: (name, index, defaultValue) => (
    <Input
      type="checkbox"
      name={name}
      key={index}
      defaultValue={defaultValue}
    />
  ),
};

// const relationFieldTypes = {
//   select: (name: string, options: { name: string; value: string }[]) => (
//     <Select name={name} options={options} />
//   ),

// }

export class FromBuilder {
  constructor() {}

  generateField(fields: ModelInfo[] | undefined): React.ReactElement {
    return (
      <>
        {fields?.map((fieldInfo, index) => {
          if (fieldInfo.type && !fieldInfo.relationWith) {
            return this.generatePrimitiveField(fieldInfo, index);
          } else {
            return <div></div>;
          }
        })}
      </>
    );
  }

  generatePrimitiveField(fieldInfo: ModelInfo, index: number) {
    if (!fieldInfo.type) return;
    return primitiveFieldTypes[fieldInfo.type](
      fieldInfo.fieldName,
      index,
      fieldInfo.defaultValue
    );
  }

  generateRelationField() {}
}
