import { Pipe, PipeTransform } from '@angular/core';

/**
* Pipe for transforming datetime
* return hh:mm
*/

@Pipe({
   name: 'timeOnlyFormat'
})
export class TimeOnlyFormatPipe implements PipeTransform {

   transform(value: string): any {
      const start = (value && value.includes(' ')) ? value.indexOf(' ') : null;
      const lastindex = (value.includes(':')) ? value.lastIndexOf(':') : null;
      return (start != null && lastindex != null)  ? value.substring(start + 1, lastindex) : '00:00';
   }

}
