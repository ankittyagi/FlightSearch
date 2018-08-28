
import { Directive, HostListener, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Constants } from './../../utils/constants';

/**
* Directive for input number validation
* Value must be greater than 0
*/

@Directive({
   selector: '[appValidateInput]'
})

export class ValidateInputDirective {
   @Input() validateFor: string;
   @Input() ngModel;
   numberPattern = Constants.patterns.number;
   pattern: RegExp;

   constructor(private model: NgModel) { }

   @HostListener('input', ['$event.target.value'])
   onInput(value) {
      switch (this.validateFor) {
         case 'number': {
            this.pattern = this.numberPattern;
         }
      }
      const regexStr = new RegExp(this.pattern);
      const regEx = new RegExp(regexStr);
      while (value.length > 0 && !regEx.test(value)) {
         value = value.substring(0, value.length - 1);
      }
      this.model.control.setValue(value);
   }

}
