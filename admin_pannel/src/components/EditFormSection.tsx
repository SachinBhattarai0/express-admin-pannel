import React, { useEffect, useState } from "react";
import { TableInfo } from "../types/main";
import { useLocation } from "react-router-dom";
import { FromBuilder } from "../utils/FromBuilder";
import Button from "./Form/Button";
import { postRequest } from "../utils/fetches";
import Spinner from "../container/Spinner";

type ContentProps = {
  activeTable: TableInfo | null;
};

const EditFormSection = ({ activeTable }: ContentProps) => {
  const { state: modelValue } = useLocation();
  const [isFetchPending, setIsFetchPending] = useState(false);
  const formBuilder = new FromBuilder(window.fetchURL);

  const [activeTableState, setActiveTableState] = useState<TableInfo | null>(
    activeTable
  );
  /* this is a change identifier which will rerun the useEffect at bottom */
  const [changeId, setChangeId] = useState(Math.random());

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
  }, [changeId]);

  return (
    <form className="bg-white m-4 p-3 md:p-6 rounded border border-gray-300 shadow-md space-y-1">
      {formBuilder.generateField(activeTableState?.fields)}
      {isFetchPending && (
        <div className="mx-auto first:h-10 first:w-10">
          <Spinner />
        </div>
      )}

      <Button>Submit</Button>
    </form>
  );
};

export default EditFormSection;
