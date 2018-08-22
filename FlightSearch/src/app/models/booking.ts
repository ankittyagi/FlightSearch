export interface Booking {
   departureCity: string;
   departureDate: string;
   arrivalCity: string;
   numberOfPassengers: number;
   return: boolean;
   returnDate?: string;
   refine?: number;
}
