import { DField, FieldType } from "../../../lib/components/Form/decorators/DField";
import { DForm } from "../../../lib/components/Form/decorators/DForm";
import { EnumValues } from '../../../lib/components/Form/DFormTemplate';

class Person {
  name!: string;
  sexe!: string;
  city!: string;
}

export class City {
  name!: string;
}

enum Enum {
  text = "text",
  checkbox = "checkbox",
  select = "select",
}

@DForm({
  name: "my form 2",
  class: "",
  id: "",
  submit : {
    class: "btn btn-primary",
    icon: "",
    label: "Ajouter",
  }
})
export class FormModel  {

  id?: number;

  @DField({
    key: "name",
    label: "Name",
    type: FieldType.text,
    class: "form-control",
    container_class  : "form-group mb-2",
    required: true,
    minLength: 3,
    maxLength: 20,
    id: ""
  })
  name?: string;

  @DField({
    key:"sexe",
    label: "Sexe",
    type: FieldType.checkbox,
    class: "form-check-input",
    label_class: "form-check-label",
    container_class  : "form-check mb-2",
    required: true,
    default: false,
    id: ""
  })
  sexe?: boolean;

  @DField({
    key: "city",
    label: "City",
    type: FieldType.oselect,
    required: true,
    default: false,
    class: "form-select mb-2",
    id: "",
    data: [],
    option: {
      type: City,
      key: "${name}",
      value: "#this"
    }
  })
  city?: Person[];

  @DField({
    key: "category",
    label: "categiory",
    type: FieldType.select,
    required: true,
    default: false,
    class: "form-select mb-2",
    id: "",
    data: EnumValues(Enum),
    option: {
      type: Enum,
      key: "#this",
      value: "#this"
    }
  })
  categories?: Enum[];


  @DField({
    key: "desc",
    label: "Description",
    type: FieldType.textarea,
    class: "form-control",
    container_class  : "form-group mb-2",
    required: true,
    minLength: 3,
    maxLength: 20,
    id: ""
  })
  description?: string;

  @DField({
    key: "key",
    label: "Radiogroup",
    type: FieldType.radiogroup,
    required: true,
    default: false,
    label_class: "form-check-label",
    class: "form-check-input mb-2",
    id: "categories_rg",
    group_title: "Test", 
    group_title_class: "text-left mt-4 mb-2",
    group_class: "", 
    container_class  : "form-check mb-2",
    data: EnumValues(Enum),
  })
  categories_rg?: Enum[];

}