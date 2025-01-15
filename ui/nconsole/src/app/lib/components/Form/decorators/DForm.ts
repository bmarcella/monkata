import 'reflect-metadata';

export interface DFormConfig {
  name?: string;
  class?: string;
  id?:string | number;
  title?: string;
  description?: string;
  submitLabel?: string;
  cancelLabel?: string;
  submit? : {
    class?: string,
    icon?: string,
    label?: string,
  }
}

export const FORM_METADATA_KEY = 'form:metadata';

export function DForm(config: DFormConfig = {}) {
  return function (target: any) {
    Reflect.defineMetadata(FORM_METADATA_KEY, {
      name: config.name || target.name,
      class: config.class || target.class,
      id: config.class || target.id,
      title: config.title || target.name,
      description: config.description || '',
      submitLabel: config.submitLabel || 'Submit',
      cancelLabel: config.cancelLabel || 'Cancel',
      submit: config.submit || {
        class: '',
        icon: '',
        label: 'Submit',
      }
    }, target);

    return target;
  };
}

export function getDFormMetadata(target: any): DFormConfig {
  // Retrieve metadata and provide fallback
  return Reflect.getMetadata(FORM_METADATA_KEY, target) || {
    name: target.name,
    class: '',
    id: '',
    title: target.name,
    description: '',
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
  };
}