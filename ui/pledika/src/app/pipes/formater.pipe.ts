import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formater'
})
export class FormaterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
  if (value != null) {
    return value.split('T')[0];
  }
  return 'non mentioné';
  }

}
