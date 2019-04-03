import { Constants } from '../../utils/constants';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ApiService } from './api.service';
import { TestBed, inject } from '@angular/core/testing';
import { Http, HttpModule, XHRBackend, BaseRequestOptions,
   RequestMethod, Response, ResponseOptions } from '@angular/http';

const mockFlightResponse = {
   flights: [
      {
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
   ]
};

describe('Api Service', () => {
   let apiService: ApiService;
   let mockBackend: MockBackend;
   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [ApiService, MockBackend, BaseRequestOptions, {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory:
               (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                  return new Http(backend, defaultOptions);
               }
         }],
         imports: [HttpModule]
      });
      TestBed.compileComponents();
   });

   beforeEach(inject([ MockBackend, Http ],
      (mb: MockBackend, http: Http) => {
         mockBackend = mb;
         apiService = new ApiService(http);
      }
   ));

   it('should be created', inject([ ApiService ], (service: ApiService) => {
      expect(service).toBeTruthy();
   }));

   it('should return promise with flights array', (done) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toEqual(RequestMethod.Get);
        expect(connection.request.url).toEqual(Constants.URL.apiUrl);
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockFlightResponse)
        })));
      });
      apiService.getAll().then(data => {
        expect(data).toEqual(mockFlightResponse.flights);
        done();
      });
    });

});
