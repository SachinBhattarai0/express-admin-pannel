import React from "react";
import { ModelInfo, PrimitiveFieldTypes } from "../../types/main";
import Checkbox from "../Form/Checkbox";
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";

const primitiveFieldTypes: PrimitiveFieldTypes = {
  string: (name, defaultValue) => (
    <Input name={name} defaultValue={defaultValue} />
  ),
  number: (name, defaultValue) => (
    <Input type="number" name={name} defaultValue={defaultValue} />
  ),
  date: (name, defaultValue) => (
    //slicing default value below so that it remains in format yyyy-mm-dd
    <Input type="date" name={name} defaultValue={defaultValue?.slice(0, 10)} />
  ),
  text: (name, defaultValue) => (
    <Textarea name={name} defaultValue={defaultValue} />
  ),

  boolean: (name, defaultValue) => (
    <Checkbox name={name} checked={defaultValue} />
  ),
};

const PrimitiveField = ({ fieldInfo }: { fieldInfo: ModelInfo }) => {
  if (!fieldInfo.type) return <div></div>;
  return primitiveFieldTypes[fieldInfo.type](
    fieldInfo.fieldName,
    fieldInfo.defaultValue
  );
};

export default PrimitiveField;
