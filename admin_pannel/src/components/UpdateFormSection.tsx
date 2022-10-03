import React, { useEffect, useState, useRef } from "react";
import { TableInfo } from "../types/main";
import { useLocation } from "react-router-dom";
import { postRequest } from "../utils/fetches";
import FormBuilder from "./FormBuilders/FormBuilder";
import Spinner from "../container/Spinner";
import Button from "./Form/Button";

type UpdateFormSectionProps = {
  activeTable: TableInfo | null;
};

const UpdateFormSection = ({ activeTable }: UpdateFormSectionProps) => {
  const { state: modelValue } = useLocation();
  const [isFetchPending, setIsFetchPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [activeTableState, setActiveTableState] = useState<TableInfo | null>(
    activeTable
  );

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

  // useEffect(() => {
  //   const form = formRef.current;
  //   Object.entries(modelValue).forEach(([key, value], i) => {
  //     const element = form?.querySelector<HTMLInputElement>(`[name='${key}']`);
  //     if (!element) return;
  //     if (element.type === "date") {
  //       //slicing so that value remains in format yyyy-mm-dd
  //       value = (value as string).slice(0, 10);
  //     }
  //     element.value = value as string;
  //   });
  // }, [activeTable]);

  if (!activeTable) return <div></div>;
  return (
    <form
      ref={formRef}
      className="bg-white m-4 p-3 md:p-6 rounded border border-gray-300 shadow-md space-y-1"
    >
      <FormBuilder fields={activeTableState?.fields} />

      {isFetchPending && (
        <div className="mx-auto first:h-10 first:w-10">
          <Spinner />
        </div>
      )}

      <Button>Submit</Button>
    </form>
  );
};

export default UpdateFormSection;
