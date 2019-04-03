import { Booking } from './booking';
export interface Flight {
   flightID: string;
   departure: string;
   destination: string;
   time: ArrivalDepartureTime;
   cost: number;
}

interface ArrivalDepartureTime {
   departure: string;
   destination: string;
}

export interface FlightSearchParameters {
   booking: Booking;
   forwardFlights: Flight[];
   returnFlights?: Flight[];
   return: Boolean;
   limit: number;
}
