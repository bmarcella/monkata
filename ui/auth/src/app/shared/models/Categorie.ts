export class Categorie {
  id?: number;
  name?: string;
  icon?: string;
  description?: string;
  children?: Categorie[];
  parent?: Categorie;
  type_categorie?: string;
}
