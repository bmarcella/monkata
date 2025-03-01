export enum UnityType {
    direction = 'direction',
    departement = 'departement',
    service = "service",
    poste = "poste"
  }
  
  export interface Unity {
    id?: number;
    name?: string;
    isPoste?: boolean;
    id_entApp?: number;
    type_unity?: UnityType;
    icon?: string;
    description: string;
    children?: Unity[];
    parent?: Unity;
  }