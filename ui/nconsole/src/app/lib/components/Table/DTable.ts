export enum DTableHeaderType {
  COMPONENT = "component",
  LABEL = "label",
  ACTION = "action",
  CHECKBOX = "checkbox",
  TEXT = "text",
  DATE = "date",
  NUMBER = "number",
  CURRENCY = "currency",
  IMAGE = "image",
  LINK = "link",
  BUTTON = "button",
  ICON = "icon",
  STATUS = "status",
  CUSTOM = "custom",
  RADIO = "radio",
}

export enum ActionType {
  CHECKBOX = "checkbox",
  RADIO = "radio",
  LINK = "link",
  BUTTON = "button",
}

export interface ActionTable {
  name?: string ,
  label: string;
  id?: string;
  class?: string;
  icon?: string;
  type: ActionType;
  callback: ()=>void ;
}

export interface TableHeader {
  type?: DTableHeaderType;
  key: string;
  label?: string;
  id?: string;
  class?: string;
  actions? : ActionTable [];
}

export interface TablePagination {
  currentPage: number,
  totalPages: number,
  newPage?: number,
}



export interface TableConfig {
  id?: string;
  class?: string;
  body_class?: string ;
  container_class?: string;
}

export class DTable<T>  {
  config!: TableConfig;
  public headers: TableHeader[] | undefined;
  public get _headers(): TableHeader[] {
    return this.headers || [];
  }
  public data?: T [];
  pagination? : TablePagination; 

  constructor(private name: string) { }

  init(headers: TableHeader[], data: T [], config?: TableConfig, pagination?: TablePagination) {
    this.headers = headers;
    this.data = data;
    this.config = config || {}
    this.pagination = pagination ;
    return this;
  }


  public pageChangedDone(data: T[]){
    if (this.pagination == undefined) return;
    this.pagination.currentPage = this.pagination?.newPage || 1;
    this.data = data;
  }
  
}