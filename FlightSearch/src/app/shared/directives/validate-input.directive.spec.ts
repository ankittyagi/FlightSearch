import { ValidateInputDirective } from './validate-input.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
   selector: 'app-number-only-component',
   template: `<input type="text" id="txtNumberInput" appValidateInput validateFor='number' [(ngModel)]="inputValue">`
})
class NumberOnlyComponent {
   inputValue = '';
}

describe('ValidateInputDirective', () => {
   let componentName: NumberOnlyComponent;
   let fixtureNum: ComponentFixture<NumberOnlyComponent>;
   let inputElNum: DebugElement;
   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule],
         declarations: [
            NumberOnlyComponent,
            ValidateInputDirective]
      });
      fixtureNum = TestBed.createComponent(NumberOnlyComponent);
      componentName = fixtureNum.componentInstance;
      inputElNum = fixtureNum.debugElement.query(By.css('input'));
      fixtureNum.detectChanges();
   });
   it('should create an instance', () => {
      const directive = new ValidateInputDirective(null);
      expect(directive).toBeTruthy();
   });
   it('should avoid alphabets for number only component', () => {
      inputElNum.nativeElement.value = '12a';
      inputElNum.nativeElement.dispatchEvent(new Event('input'));
      fixtureNum.detectChanges();
      fixtureNum.whenStable().then(() => {
         expect(fixtureNum.componentInstance.inputValue).toBe('12');
      });
   });
   it('should accept 1-9 numbers only', () => {
      inputElNum.nativeElement.value = '0';
      inputElNum.nativeElement.dispatchEvent(new Event('input'));
      fixtureNum.detectChanges();
      fixtureNum.whenStable().then(() => {
         expect(fixtureNum.componentInstance.inputValue).toBe('');
      });
   });
});

