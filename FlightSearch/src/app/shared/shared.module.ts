import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeOnlyFormatPipe } from './pipes/time-only-format.pipe';
import { CityCodePipe } from './pipes/city-code.pipe';
import { ValidateInputDirective } from './directives/validate-input.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [TimeOnlyFormatPipe, CityCodePipe, ValidateInputDirective],
  declarations: [TimeOnlyFormatPipe, CityCodePipe, ValidateInputDirective]
})
export class SharedModule { }
