export type TableInfo = {
  tableName: string;
  fields: ModelInfo[];
};

export type TAbleContext = {
  activeTable: TableInfo | null;
  setActiveTable: React.Dispatch<React.SetStateAction<TableInfo | null>> | null;
};

export type FieldTypes = "string" | "date" | "number" | "text" | "boolean";

export type relationModel = { name: string; value: string };

export interface ModelInfo {
  type: FieldTypes | undefined;
  fieldName: string;
  allowNull?: boolean;
  defaultValue?: string;
  relationWith?: {
    model: string;
    key: string;
    options: { [key: string]: any }[];
  };

  //associations
  associationType?: "oneToOne" | "oneToMany";
}

export type PrimitiveFieldTypes = {
  [key in FieldTypes]: (
    name: string,
    defaultValue?: string
  ) => React.ReactElement;
};
