import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Flight, FlightSearchParameters } from '../models/flights';
import { Booking } from '../models/booking';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../utils/constants';

@Injectable()
export class FlightService {
   labels = Constants.labels;
   constructor(private http: Http) { }

   public searchFlights(booking: Booking, limit): Promise<FlightSearchParameters> {
      return this.http.get(this.labels.apiUrl).toPromise().then(data => {
         return {
            limit: limit,
            booking: booking,
            onwardFlights: this.getFlights(data.json(), booking, false),
            return: booking.return,
            returnFlights: booking.return ? this.getFlights(data.json(), booking, true) : null
         };
      }).catch(Promise.reject);
   }

   public getCities(): Promise<string[]> {
      return this.http.get(this.labels.apiUrl)
         .toPromise()
         .then(data => {
            const allCities = new Set();
            data.json().flights.map(x => {
               allCities.add(x.departure);
            });
            return Promise.resolve(Array.from(allCities));
         })
         .catch(Promise.reject);
   }

   private getFlights(data: any, booking: Booking, returnFlight = false): Flight[] {
      data.flights.map(flight => flight.cost = parseInt(flight.cost, 10));
      const flights: Flight[] = data.flights;
      flights.sort((x, y) => {
         return x.cost - y.cost;
      });
      return this.filterFlights(flights, booking, returnFlight);
   }

   private filterFlights(flights: Flight[], booking: Booking, returnFlight: Boolean = false): Flight[] {
      const filteredFlights: Flight[] = [];
      if (returnFlight) {
         flights.map((x) => {
            if (Date.parse(x.time.departure.split(' ')[0]) === Date.parse(booking.returnDate)
               && x.departure === booking.destinationCity && x.destination === booking.departureCity) {
               filteredFlights.push(x);
            }
         });
      } else {
         flights.map((x) => {
            if (Date.parse(x.time.departure.split(' ')[0]) === Date.parse(booking.departureDate)
               && x.departure === booking.departureCity && x.destination === booking.destinationCity) {
               filteredFlights.push(x);
            }
         });
      }
      return filteredFlights;
   }
}
