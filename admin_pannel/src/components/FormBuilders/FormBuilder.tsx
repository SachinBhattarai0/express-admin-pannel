import React from "react";
import { ModelInfo } from "../../types/main";
import PrimitiveField from "./PrimitiveField";
import RelationField from "./RelationField";

type FormBuilderProps = {
  fields: ModelInfo[] | undefined;
};

const FormBuilder = (props: FormBuilderProps) => {
  return (
    <>
      {props.fields?.map((fieldInfo, index) => {
        if (fieldInfo.type && !fieldInfo.relationWith) {
          return <PrimitiveField key={index} fieldInfo={fieldInfo} />;
        } else if (fieldInfo.relationWith) {
          return <RelationField key={index} fieldInfo={fieldInfo} />;
        }
      })}
    </>
  );
};

export default FormBuilder;
