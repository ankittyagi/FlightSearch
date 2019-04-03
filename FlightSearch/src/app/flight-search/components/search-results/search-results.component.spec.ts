import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightSearchParameters } from './../models/flights';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from './../../../node_modules/@angular/forms';
import { SearchResultsComponent } from './search-results.component';
import { TimeOnlyFormatPipe } from '../shared/pipes/time-only-format.pipe';
import { CityCodePipe } from './../shared/pipes/city-code.pipe';

const FlightSearchParametersData: FlightSearchParameters = {
   booking: {
      departureCity: 'Delhi',
      departureDate: '',
      destinationCity: 'Kolkata',
      numberOfPassengers: 2,
      return: true,
      returnDate: null,
   },
   forwardFlights: [{
      flightID: 'A110',
      departure: 'Delhi',
      destination: 'Kolkata',
      time: {departure: '09-08-2018 02:00:00', destination: '09-08-2018 04:00:00'},
      cost: 2000
   }],
   returnFlights: [{
      flightID: 'A110',
      departure: 'Kolkata',
      destination: 'Delhi',
      time: {departure: '10-08-2018 02:00:00', destination: '10-08-2018 04:00:00'},
      cost: 2000
   }],
   return: true,
   limit: 10000
};

describe('SearchResultsComponent', () => {
   let component: SearchResultsComponent;
   let fixture: ComponentFixture<SearchResultsComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule],
         declarations: [SearchResultsComponent, FlightDetailsComponent, CityCodePipe, TimeOnlyFormatPipe]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(SearchResultsComponent);
      component = fixture.componentInstance;
      component.flightSearchParameters = FlightSearchParametersData;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should check oneway flight total amount', () => {
      component.ngOnChanges();
      const return_value = component.checkFlight(FlightSearchParametersData.forwardFlights[0], null);
      expect(return_value).toBeTruthy();
   });
});
