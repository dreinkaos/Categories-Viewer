import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueByKey'
})
export class ValueByKeyPipe implements PipeTransform {
  transform(key: string, values: any[]): string {
    var translation = values.find(v => v.key === key);    
    if (translation){
      return translation.value;
    }
    return key;      
  }
}
