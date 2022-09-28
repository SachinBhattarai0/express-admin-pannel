export type TableInfo = {
  tableName: string;
  fields: ModelInfo[];

  /* associations means to which other models refrences this model */
  associations?: {
    model: string;
    associationType: "oneToOne" | "oneToMany";
  };
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

  /* relationWith means to which models this model refrence*/
  relationWith?: {
    model: string;
    key: string;
    options: { [key: string]: any }[];
  };
}

export type PrimitiveFieldTypes = {
  [key in FieldTypes]: (
    name: string,
    defaultValue?: string
  ) => React.ReactElement;
};
