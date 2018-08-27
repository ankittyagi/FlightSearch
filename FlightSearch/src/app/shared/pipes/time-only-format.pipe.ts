import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'timeOnlyFormat'
})
export class TimeOnlyFormatPipe implements PipeTransform {

   transform(value: string, args?: any): any {
      return value.substring(value.indexOf(' ') + 1, value.lastIndexOf(':'));
   }

}
