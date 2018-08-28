
import { Injectable } from '@angular/core';
import { Flight, FlightSearchParameters } from '../models/flights';
import { Booking } from '../models/booking';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../utils/constants';
import { ApiService } from './api.service';

@Injectable()
export class FlightService {
   labels = Constants.labels;
   constructor(private apiService: ApiService) { }

   /**
   * Search flights and return object of all  search param
   * @param booking: flight booking info
   * @param limit: cost limit
   */
   public searchFlights(booking: Booking, limit: number): Promise<FlightSearchParameters> {
      return this.apiService.getAll().then(flights => {
         const ob: FlightSearchParameters = {
            limit: limit,
            booking: booking,
            forwardFlights: this.sortAndFilterFlights(flights, booking, false),
            return: booking.return,
            returnFlights: booking.return ? this.sortAndFilterFlights(flights, booking, true) : null
         };
         return Promise.resolve(ob);
      }).catch(Promise.reject);
   }

   /**
   * Search flights and return all unique departure city list
   */
   public getCities(): Promise<string[]> {
      return this.apiService.getAll().then(data => {
            const allCities = new Set();
            data.map(x => {
               allCities.add(x.departure);
            });
            return Promise.resolve(Array.from(allCities));
         }).catch(Promise.reject);
   }

   /**
   * Sort flights as per cost
   * @param flights: all flights list
   * @param booking: flight booking info
   * @param returnFlight: if return flight
   */

   private sortAndFilterFlights(flights: Flight[], booking: Booking, returnFlight: Boolean = false): Flight[] {
      flights.forEach(flight => flight.cost = parseInt(String(flight.cost), 10));
      flights.sort((x, y) => {
         return x.cost - y.cost;
      });
      return this.filterFlights(flights, booking, returnFlight);
   }

   /**
   * Filter flights as date, departure and destination city
   * @param flights: all flights list
   * @param booking: flight booking info
   * @param returnFlight: if return flight
   */

   private filterFlights(flights: Flight[], booking: Booking, returnFlight: Boolean): Flight[] {
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
