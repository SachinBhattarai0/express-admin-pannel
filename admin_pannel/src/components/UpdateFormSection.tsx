import React, { useEffect, useState } from "react";
import { TableInfo } from "../types/main";
import { useLocation } from "react-router-dom";
import { FromBuilder } from "../utils/FromBuilder";
import Button from "./Form/Button";
import { postRequest } from "../utils/fetches";
import { useNavigate } from "react-router-dom";
import Spinner from "../container/Spinner";
import { useAlertContext } from "../context/AlertProvider";

type ContentProps = {
  activeTable: TableInfo | null;
};

const EditFormSection = ({ activeTable }: ContentProps) => {
  const { state: modelValue } = useLocation();
  const { updateAlert } = useAlertContext();
  const [isFetchPending, setIsFetchPending] = useState(false);
  const formBuilder = new FromBuilder(window.fetchURL);
  const [isFormPending, setIsFormPending] = useState(false);
  const [activeTableState, setActiveTableState] = useState<TableInfo | null>(
    activeTable
  );
  const navigate = useNavigate();

  /* this is a change identifier which will rerun the useEffect at bottom */
  const [changeId, setChangeId] = useState(Math.random());

  /* if there are multple primary key then returns stringified form of object ontaining key as pk identifier and value as value of pk */
  const primaryKey = activeTable?.primaryKeyFields!.reduce((pv, cv) => {
    let nv = JSON.parse(pv) as { [key: string]: string };
    nv[cv] = modelValue[cv];
    return JSON.stringify(nv);
  }, "{}");

  useEffect(() => {
    if (!activeTable?.tableName) return;
    activeTable.fields.forEach(async (field, i) => {
      setChangeId(Math.random());
      if (!field.relationWith) return;
      setIsFetchPending(true);
      const modelName = field.relationWith.model;
      const option = await postRequest(
        `${window.fetchURL}/model-values/${modelName}`
      );

      field.relationWith.options = option;
      activeTable.fields[i] = field;
      setActiveTableState({ ...activeTable });
      setIsFetchPending(false);
    });
  }, []);

  useEffect(() => {
    const newActiveTableState = activeTableState;
    activeTableState?.fields.map((field, i) => {
      const fieldValue = newActiveTableState?.fields[i];
      fieldValue!.defaultValue = modelValue[field.fieldName];
    });
    setActiveTableState(newActiveTableState);
  }, [activeTable]);

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
      } else if (!formDataObj[field.fieldName] && field.allowNull === false) {
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

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white m-4 p-3 md:p-6 rounded border border-gray-300 shadow-md space-y-1"
    >
      {formBuilder.generateField(activeTableState?.fields)}
      {isFetchPending && (
        <div className="mx-auto first:h-10 first:w-10">
          <Spinner />
        </div>
      )}

      <Button isPending={isFormPending}>Submit</Button>
    </form>
  );
};

export default EditFormSection;
