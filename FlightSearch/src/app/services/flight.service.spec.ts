import { ApiService } from './api.service';
import { Booking } from './../models/booking';
import { TestBed } from '@angular/core/testing';
import { FlightService } from './flight.service';
import { Flight, FlightSearchParameters } from './../models/flights';

const mockResponse: Flight[] = [{
      flightID: 'A110',
      departure: 'Delhi',
      destination: 'Kolkata',
      time: { departure: '2018-08-26 04:00:00', destination: '2018-08-26 06:00:00' },
      cost: 2000
   }, {
      flightID: 'A111',
      departure: 'Kolkata',
      destination: 'Delhi',
      time: { departure: '2018-08-26 08:00:00', destination: '2018-08-26 10:00:00' },
      cost: 2000
   }
];

const booking: Booking = {
   departureCity: 'Delhi',
   departureDate: '2018-08-26',
   destinationCity: 'Kolkata',
   numberOfPassengers: 2,
   return: true,
   returnDate: '2018-08-26',
};

const apiServiceStub = {
   getAll: jasmine.createSpy('getAll').and.returnValue(Promise.resolve(mockResponse)),
};

describe('FlightService', () => {

   let service: FlightService;
   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [FlightService, { provide: ApiService, useValue: apiServiceStub }]
      });
      TestBed.compileComponents();
      service = TestBed.get(FlightService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   it('should run a test that gives the response', (done) => {
      service.searchFlights(booking, 10000).then(
         (data: FlightSearchParameters) => {
            expect(data).toBeDefined();
            expect(data.forwardFlights[0].flightID).toEqual('A110');
            done();
         }
      );
   });

   it('should run a test that gives a object type response', (done) => {
      service.getCities().then(
         (data: String[]) => {
            expect(data).toBeDefined();
            expect(data[0]).toEqual('Delhi');
            done();
         }
      );
   });

});
