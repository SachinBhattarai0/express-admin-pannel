export type TableInfo = {
  tableName: string;
  fields: ModelInfo[];
};

export type TAbleContext = {
  activeTable: TableInfo | null;
  setActiveTable: React.Dispatch<React.SetStateAction<TableInfo | null>> | null;
};

export type FieldTypes = "string" | "date" | "number" | "text" | "boolean";

export interface ModelInfo {
  type: FieldTypes | undefined;
  fieldName: string;
  allowNull?: boolean;
  defaultValue?: string;
  relationWith?: { model: string; key: string };
  relationType?:
    | "oneToOne"
    | "oneToMany" /* relationType is not the actual relations between models */;
}

export type PrimitiveFieldTypes = {
  [key in FieldTypes]: (
    name: string,
    defaultValue?: string
  ) => React.ReactElement;
};
