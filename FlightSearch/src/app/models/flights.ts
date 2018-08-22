export interface Flights {
   flightID: string;
   departure: string;
   arrival: string;
   time: ArrivalDepartureTime;
   date: string;
   cost: number;
}

interface ArrivalDepartureTime {
   departureTime: string;
   arrivaltime: string;
}
