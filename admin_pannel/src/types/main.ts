export type TableInfo = {
  tableName: string;
  fields: ModelInfo[];
};

export type TAbleContext = {
  activeTable: TableInfo | null;
  setActiveTable: React.Dispatch<React.SetStateAction<TableInfo | null>> | null;
};

export interface ModelInfo {
  type: "string" | "date" | "number" | "text" | "boolean" | undefined;
  fieldName: string;
  allowNull?: boolean;
  defaultValue?: string | number | boolean;
  refrences?: { model: string; key: string };
  relationType?:
    | "oneToOne"
    | "oneToMany" /* relationType is not the actual relations between models */;
}
