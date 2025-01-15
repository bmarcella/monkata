
import 'reflect-metadata';
import { Subject } from 'rxjs';
import { DFieldConfig, getDecoratedFields, getFieldMetadata } from './decorators/DField';
import { getDFormMetadata } from './decorators/DForm';
export const EnumValues = (item: any)=>{
  return Object.values(item);
}
export class DFormTemplate<T> {
  fields: string[]=[];
  DFields:  DFieldConfig<T>[] = [];
  formMetadata: any ;
  $form: Subject<any> = new Subject<{
    name: string,
    values: []
  }>();

  $submit: Subject<any> = new Subject<T>();
  constructor(private readonly name: string, private FormModel: any) {
    this.formMetadata = getDFormMetadata(FormModel);
    this.fields = getDecoratedFields(FormModel);
    this.fields.forEach(field => {
      const fieldMetadata: any = getFieldMetadata<T>(FormModel, field);
      this.DFields.push(fieldMetadata);
    });
    this.$form.subscribe((data) => {
      console.log('Form data:', data);
      const index = this.DFields.findIndex( (field )=> field.key == data.name );
      this.DFields[index].data = data.values;
    });
  }

  getFormValue (){
    const formValues: any = {};
    this.DFields.forEach((field) => {
        formValues[field.key] = field.value;
    });
    return formValues;
  }

  onSubmit(data: T){
     this.$submit.next(data);
  }
  close(){
    this.$form.unsubscribe();
  }

}




