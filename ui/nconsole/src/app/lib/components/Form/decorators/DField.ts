import 'reflect-metadata';

// Types for field options
export enum FieldType {
  text = "text",
  checkbox = "checkbox",
  select = "select",
  oselect = "oselect",
  radio = "radio",
  radiogroup = "radiogroup",
  textarea = "textarea",
  date = "date",
  number = "number"
}

interface OptionConfig<T> {
  type: T | { new(): T } | Function | any;
  key: string;
  value: string | '#this';
}

export interface DFieldConfig<T = any> {
  value?: any,
  key: string , 
  placeholder?: string;
  group_title?: string;
  group_title_class?: string;
  group_class?: string;
  label?: string;
  type: FieldType;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  class?: string;
  label_class?: string;
  label_id?: string;
  id?: string;
  data?: T[] | undefined;
  default?: any;
  option?: OptionConfig<T>;
  container_class?: string;
  container_id?: string;
}


const FIELD_METADATA_KEY = 'DField:metadata';


export function DField<T = any>(config: DFieldConfig<T>): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const targetConstructor = target.constructor; // Metadata is stored on the constructor.

    // Apply defaults
    const metadata: DFieldConfig<T> = {
      ...config,
      required: config.required ?? false,
      class: config.class ?? '',
      data: config.data || [],
      key: config.key ?? config.label,
      id: config.id ?? '',
    };

    // Store metadata for this field
    Reflect.defineMetadata(
      `${FIELD_METADATA_KEY}:${String(propertyKey)}`, // Key includes field name
      metadata,
      targetConstructor // Metadata stored on the class constructor
    );

    // Store field name in the list of decorated fields
    const fields: string[] = Reflect.getMetadata(FIELD_METADATA_KEY, targetConstructor) || [];
    if (!fields.includes(propertyKey as string)) {
      Reflect.defineMetadata(
        FIELD_METADATA_KEY,
        [...fields, propertyKey],
        targetConstructor
      );
    }
  };
}


// Utility functions to read metadata
export function getFieldMetadata<T>(target: any, propertyKey: string): DFieldConfig<T> | undefined {
  return Reflect.getMetadata(`${FIELD_METADATA_KEY}:${propertyKey}`, target);
}

export function getDecoratedFields(target: any): string[] {
  // Metadata should be fetched from the constructor
  return Reflect.getMetadata(FIELD_METADATA_KEY, target) || [];
}
