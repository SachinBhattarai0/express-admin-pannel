import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableInfo } from "../types/main";
import Button from "./Form/Button";
import { FromBuilder } from "../utils/FromBuilder";
import { postRequest } from "../utils/fetches";
import { useAlertContext } from "../context/AlertProvider";

type FormSelectionProps = {
  activeTable: TableInfo | null;
  fetchUrl: string;
};

const FormSection = ({ activeTable, fetchUrl }: FormSelectionProps) => {
  const navigate = useNavigate();
  const formBuilder = new FromBuilder(fetchUrl);
  const { updateAlert } = useAlertContext();
  const [isFormPending, setIsFormPending] = useState(false);
  const [activeTableState, setActiveTableState] = useState<TableInfo | null>(
    activeTable
  );

  useEffect(() => {
    if (!activeTable?.tableName) return;

    activeTable.fields.forEach(async (field, i) => {
      if (!field.relationWith) return;
      const modelName = field.relationWith.model;
      const option = await postRequest(`${fetchUrl}/model-values/${modelName}`);

      field.relationWith.options = option;
      activeTable.fields[i] = field;
    });

    setActiveTableState(activeTable);
  }, [activeTable]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let formDataObj: { [key: string]: any } = {};

    formData.forEach((value: any, key: string) => {
      formDataObj[key] = value;
    });

    activeTableState?.fields.forEach((field) => {
      /*
      by defautt if value of checkbox is unchecked then new FormData ignores key&value of checkbox.
      this can create problem sometimes so below configuration will check whether formData is missing any
      value and when found that the missing type is checkbox then the value will be set to false
       */
      if (!formDataObj[field.fieldName] && field.type === "boolean") {
        formDataObj[field.fieldName] = false;
      } else if (!formDataObj[field.fieldName] && field.allowNull === false) {
        updateAlert!(`${field.fieldName} cannot be empty!`);
      }
    });

    const url = `${fetchUrl}/create/${activeTableState?.tableName}/`;

    setIsFormPending(true);
    const data = await postRequest(url, { ...formDataObj });
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

      <Button isPending={isFormPending}>Submit</Button>
    </form>
  );
};

export default FormSection;
