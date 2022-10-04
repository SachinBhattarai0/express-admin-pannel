import React, { useEffect, useState, useRef } from "react";
import { TableInfo } from "../types/main";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequest } from "../utils/fetches";
import FormBuilder from "./FormBuilders/FormBuilder";
import { useAlertContext } from "../context/AlertProvider";
import Spinner from "../container/Spinner";
import Button from "./Form/Button";

type UpdateFormSectionProps = {
  activeTable: TableInfo | null;
};

const UpdateFormSection = ({ activeTable }: UpdateFormSectionProps) => {
  const { state: modelValue } = useLocation();
  const navigate = useNavigate();
  const { updateAlert } = useAlertContext();
  const [isFetchPending, setIsFetchPending] = useState(false);
  const [isFormPending, setIsFormPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [activeTableState, setActiveTableState] = useState<TableInfo | null>(
    activeTable
  );

  /* if there are multple primary key then returns stringified form of object ontaining key as pk identifier and value as value of pk */
  const primaryKey = activeTable?.primaryKeyFields?.reduce((pv, cv) => {
    let nv = JSON.parse(pv) as { [key: string]: string };
    nv[cv] = modelValue[cv];
    return JSON.stringify(nv);
  }, "{}");

  useEffect(() => {
    if (!activeTable?.fields || !activeTableState) return;
    const newActiveTableState = activeTableState;

    activeTable.fields.forEach(async (field, i) => {
      if (field.relationWith) {
        setIsFetchPending(true);
        const modelName = field.relationWith.model;
        const option = await postRequest(
          `${window.fetchURL}/model-values/${modelName}`
        );

        field.relationWith.options = option;
        newActiveTableState!.fields[i] = field;
        setActiveTableState(newActiveTableState);
        setIsFetchPending(false);
      }
      const form = formRef.current;
      Object.entries(modelValue).forEach(([key, value], i) => {
        const element = form?.querySelector<HTMLInputElement>(
          `[name='${key}']`
        );
        if (!element) return;
        if (element.type === "date") {
          //slicing so that value remains in format yyyy-mm-dd
          value = (value as string).slice(0, 10);
        }
        element.value = value as string;
      });
    });
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeTableState) return;

    const formData = new FormData(e.target as HTMLFormElement);
    let formDataObj: { [key: string]: any } = {};

    formData.forEach((value: any, key: string) => {
      formDataObj[key] = value;
    });

    for (let i = 0; i < activeTableState.fields.length; i++) {
      const field = activeTableState.fields[i];
      /*
      by defautt if value of checkbox is unchecked then new FormData ignores key&value of checkbox.
      this can create problem sometimes so below configuration will check whether formData is missing any
      value and when found that the missing type is checkbox then the value will be set to false
       */
      if (!formDataObj[field.fieldName] && field.type === "boolean") {
        formDataObj[field.fieldName] = false;
      } else if (
        !formDataObj[field.fieldName] &&
        (field.allowNull === false ||
          activeTable?.primaryKeyFields?.includes(field.fieldName))
      ) {
        return updateAlert!(`${field.fieldName} cannot be empty!`);
      } else if (field.type === "number" && !formDataObj[field.fieldName]) {
        /* if no value if providef for a number field and it is not required then delete the value bcoz the value will be empty string which can throw error when submitting */
        delete formDataObj[field.fieldName];
      }
    }

    const url = `${window.fetchURL}/update/${activeTableState?.tableName}/`;
    setIsFormPending(true);

    const data = await postRequest(url, {
      newValues: formDataObj,
      pk: JSON.parse(primaryKey!),
    });
    if (data.error) {
      updateAlert!(data.error);
      setIsFormPending(false);
    } else {
      updateAlert!(data.message, "SUCCESS");
      navigate(-1);
    }
  };

  if (!activeTable) return <div></div>;
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-white m-4 p-3 md:p-6 rounded border border-gray-300 shadow-md space-y-1"
    >
      <FormBuilder fields={activeTableState?.fields} />

      {isFetchPending && (
        <div className="mx-auto first:h-10 first:w-10">
          <Spinner />
        </div>
      )}

      <Button isPending={isFormPending}>Submit</Button>
    </form>
  );
};

export default UpdateFormSection;
