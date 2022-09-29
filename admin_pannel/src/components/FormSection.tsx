import { useEffect, useState } from "react";
import { TableInfo } from "../types/main";
import Button from "./Form/Button";
import { FromBuilder } from "../utils/FromBuilder";
import { postRequest } from "../utils/fetches";

type FormSelectionProps = {
  activeTable: TableInfo | null;
  fetchUrl: string;
};

const FormSection = ({ activeTable, fetchUrl }: FormSelectionProps) => {
  const formBuilder = new FromBuilder(fetchUrl);
  const [activeTableState, setActiveTableState] = useState<TableInfo | null>(
    activeTable
  );

  useEffect(() => {
    if (!activeTable?.tableName) return;
    /* fetching options for all models that are related to other */
    activeTable.fields.forEach(async (field, i) => {
      if (!field.relationWith) return;
      const modelName = field.relationWith.model.slice(0, -1);
      const option = await postRequest(`${fetchUrl}/model-values/${modelName}`);

      field.relationWith.options = option;
      activeTable.fields[i] = field;
      setActiveTableState(activeTable);
    });
  }, [activeTable]);

  useEffect(() => {
    if (!activeTable || !activeTable.associations) return;

    /* fetching options for all associations */
    activeTable.associations.forEach(async (field, i) => {
      const modelName = field.model.slice(0, -1);
      const option = await postRequest(`${fetchUrl}/model-values/${modelName}`);

      activeTable.associations![i].options = option;
      setActiveTableState(activeTable);
    });
  }, [activeTable]);

  return (
    <form
      id="rest"
      className="bg-white m-4 p-3 md:p-6 rounded border border-gray-300 shadow-md space-y-1"
    >
      {/* form elements for those fields which are mentioned in models */}
      {formBuilder.generateField(activeTableState?.fields)}

      {/* form elements for those fields which are not mentioned in that models itself like associations eg:one-to-many field are not mentioned the the source model but intarget model only  */}
      {formBuilder.generateAssociationField(activeTableState?.associations)}

      <Button>Submit</Button>
    </form>
  );
};

export default FormSection;
