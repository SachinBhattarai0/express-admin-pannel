export type TableInfo = {
  tableName: string;
  fields: ModelInfo[];
  primaryKeyFields?: string[];
};

export type TAbleContext = {
  activeTable: TableInfo | null;
  setActiveTable: React.Dispatch<React.SetStateAction<TableInfo | null>> | null;
};

export type AnyObj = {
  [key: string]: any;
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

// options that can be passed while creating instance of AdminPannel
export interface AdminPannelOptions {
  /* 
  titleFields are set of fields for each model whose value will be shown in admin pannel
  titleFields:{model1:["id","name"],model2:["field1","field2"]}
   */
  titleFields?: { [key: string]: string[] };

  /* if some field contain a url to a image and you want to show it as a image in admin pannel then
  declare the field in here eg: imageFields = {model1:['photo'],model2:['profileImg','siteImg']} */
  imageFields?: { [key: string]: string[] };
}

export interface Paginator {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}

export type PaginatorState = {
  pager: Paginator | null;
  currentPage: number;
  cb?: string;
};
