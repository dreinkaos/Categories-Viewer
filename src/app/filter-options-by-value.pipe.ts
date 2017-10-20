import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOptionsByValue'
})
export class FilterOptionsByValuePipe implements PipeTransform {

  transform(values: any[], value: string): any[] {
    if (!value || value.length === 0)
      return values;
    return values.filter(v => v.value.toLowerCase().startsWith(value.toLowerCase()));    
  }

}
