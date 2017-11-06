import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOptionsByState'
})
export class FilterOptionsByStatePipe implements PipeTransform {

  transform(values: any[], state: boolean): any[] {
    if (!values)
      return [];
    if (state === undefined || state === null)
      return values;    
    return values.filter(v => v.active == state);    
  }

}
