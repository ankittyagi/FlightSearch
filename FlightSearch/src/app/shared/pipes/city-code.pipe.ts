import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'cityCode'
})
export class CityCodePipe implements PipeTransform {

   transform(value: any, args?: any): any {
      return value.substring(0, 3).toUpperCase();
   }

}
