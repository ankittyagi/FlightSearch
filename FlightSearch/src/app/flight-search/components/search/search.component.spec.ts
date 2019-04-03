import { CityCodePipe } from './../shared/pipes/city-code.pipe';
import { FlightSearchParameters, Flight } from './../models/flights';
import { FlightService } from './../services/flight.service';

import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SearchComponent } from './search.component';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { TimeOnlyFormatPipe } from '../shared/pipes/time-only-format.pipe';

const forwardFlights: Flight[] = [{
   flightID: 'A110',
   departure: 'Delhi',
   destination: 'Kolkata',
   time: { departure: '', destination: '' },
   cost: 2000
}];
const returnFlights: Flight[] = [
   {
      flightID: 'A111',
      departure: 'Kolkata',
      destination: 'Delhi',
      time: { departure: '', destination: '' },
      cost: 2000
   }
];
const FlightSearchParametersData: FlightSearchParameters = {
   booking: {
      departureCity: 'Delhi',
      departureDate: '',
      destinationCity: 'Kolkata',
      numberOfPassengers: 2,
      return: true,
      returnDate: null,
   },
   forwardFlights: forwardFlights,
   returnFlights: returnFlights,
   return: true,
   limit: 10000
};
const flightServiceStub = {
   searchFlights: jasmine.createSpy('searchFlights').and.returnValue(Promise.resolve(FlightSearchParametersData)),
   getCities: jasmine.createSpy('getCities').and.returnValue(Promise.resolve(['Delhi', 'Kolkata'])),
};


describe('SearchComponent', () => {
   let component: SearchComponent;
   let fixture: ComponentFixture<SearchComponent>;
   let inputEl: DebugElement;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [SearchComponent, CityCodePipe, TimeOnlyFormatPipe],
         imports: [FormsModule],
         providers: [{ provide: FlightService, useValue: flightServiceStub }]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(SearchComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
   it('should toggle journey type', () => {
      component.returnJourney = false;
      component.toggleJourneyType();
      expect(component.returnJourney).toBeTruthy();
   });
   it('should not select same city on both destination and departure', fakeAsync(() => {
      const cityInList = 'Kolkata';
      const cityNotinList = 'Pune';
      component.ngOnInit();
      tick();
      fixture.detectChanges();
      component.selectDepartureCity(cityInList);
      expect(component.destinationCities.includes(cityInList)).toBeFalsy();
      component.selectDepartureCity(cityNotinList);
      expect(component.booking.departureCity).toBe(null);
   }));
   it('should not select same city on both destination and departure', fakeAsync(() => {
      const cityInList = 'Kolkata';
      const cityNotinList = 'Pune';
      component.ngOnInit();
      tick();
      fixture.detectChanges();
      component.selectDestinationCity(cityInList);
      expect(component.departureCities.includes(cityInList)).toBeFalsy();
      component.selectDestinationCity(cityNotinList);
      expect(component.booking.destinationCity).toBe(null);
   }));
   it('should empty destination city on input focus', () => {
      component.booking.destinationCity = 'Delhi';
      inputEl = fixture.debugElement.query(By.css('#destinationCity'));
      inputEl.triggerEventHandler('focus', null);
      fixture.detectChanges();
      expect(component.booking.destinationCity).toBe(null);
   });
   it('should empty departure city on input focus', () => {
      component.booking.destinationCity = 'Delhi';
      inputEl = fixture.debugElement.query(By.css('#departureCity'));
      inputEl.triggerEventHandler('focus', null);
      fixture.detectChanges();
      expect(component.booking.departureCity).toBe(null);
   });

   it('should reset return date on start date selection', () => {
      component.startDateSelected();
      expect(component.booking.returnDate).toBe(null);
   });
   it('should check form valiation on form submition', () => {
      const sampleFormInputs = {
         form: {
            valid: false
         }
      };
      component.onFormSubmit(sampleFormInputs);
      expect(component.invalidForm).toBe(true);
      sampleFormInputs.form.valid = true;
      component.onFormSubmit(sampleFormInputs);
      expect(component.invalidForm).toBe(false);
   });

   it('should perform search on range change', () => {
      component.booking = {
         departureCity: 'Delhi',
         departureDate: '2018-09-25 02:00:00',
         destinationCity: 'Kolkata',
         numberOfPassengers: 2,
         return: true,
         returnDate: null
      };
      fixture.detectChanges();
      spyOn(component, 'searchFlights');
      component.changeRangeValue(5000);
      expect(component.searchFlights).toHaveBeenCalled();
   });
   it('should set deafult range  if no valid rangeis provided', () => {
      component.changeRangeValue(null);
      expect(component.amountLimitValue).toBe(5000);
   });

});
