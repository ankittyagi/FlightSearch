

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Constants } from './utils/constants';

import { FormsModule } from '../../node_modules/@angular/forms';
import { HttpModule } from '@angular/http';
import { TimeOnlyFormatPipe } from './shared/pipes/time-only-format.pipe';
import { CityCodePipe } from './shared/pipes/city-code.pipe';
import { FlightDetailsComponent } from './search-results/flight-details/flight-details.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchComponent } from './search/search.component';
import { FlightService } from './services/flight.service';
import { FlightSearchParameters, Flight } from './models/flights';

const onwardFlights: Flight[] = [{
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
   forwardFlights: [{
      flightID: 'A110',
      departure: 'Delhi',
      destination: 'Kolkata',
      time: { departure: '', destination: '' },
      cost: 2000
   }],
   returnFlights: [{
      flightID: 'A110',
      departure: 'Kolkata',
      destination: 'Delhi',
      time: { departure: '', destination: '' },
      cost: 2000
   }],
   return: true,
   limit: 10000
};
const flightServiceStub = {
   searchFlights: jasmine.createSpy('searchFlights').and.returnValue([onwardFlights[0], returnFlights[0]]),
   getCities: jasmine.createSpy('getCities').and.returnValue(['Delhi', 'Kolkata']),
};
describe('AppComponent', () => {
   let app: AppComponent;
   let fixture: ComponentFixture<AppComponent>;
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [
            AppComponent, SearchComponent, SearchResultsComponent, FlightDetailsComponent, CityCodePipe, TimeOnlyFormatPipe
         ],
         imports: [FormsModule, HttpModule],
         providers: [{ provide: FlightService, useValue: flightServiceStub }]
      }).compileComponents();
   }));
   beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.debugElement.componentInstance;
      app.flightSearchParameters = {
         booking: {
            departureCity: '',
            departureDate: '',
            destinationCity: '',
            numberOfPassengers: null,
            return: true,
            returnDate: null,
         },
         forwardFlights: onwardFlights,
         returnFlights: returnFlights,
         return: true,
         limit: 10000
      };
   });
   it('should create the app', async(() => {
      expect(app).toBeTruthy();
   }));
   it(`should have as title`, async(() => {
      expect(app.title).toEqual(Constants.labels.appTitle);
   }));

   it(`setFlightSearch should set flightSearchParameters`, async(() => {
      app.setFlightSearch(FlightSearchParametersData);
      expect(app.flightSearchParameters.booking.departureCity).toEqual('Delhi');
   }));
});
