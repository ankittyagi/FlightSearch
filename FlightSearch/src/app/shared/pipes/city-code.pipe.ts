import { Pipe, PipeTransform } from '@angular/core';

/**
* Pipe for transform city name
* return frst 3 characters
*/

@Pipe({
   name: 'cityCode'
})
export class CityCodePipe implements PipeTransform {

   transform(value: string): string {
      return value ? value.substring(0, 3).toUpperCase() : '';
   }

}
