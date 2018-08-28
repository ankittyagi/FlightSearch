export class Constants {
   public static labels = {
      appTitle: 'Flight Search Application',
      oneWay: 'One Way',
      return: 'Return',
      provideValidInput: 'Please provide a valid input',
      invalidFormData: 'Please provide the above fields',
      refineSearch: 'Refine search',
      ruppeeSign: 'Rs:',
      bookFlight: 'Book flight',
      searchSomething: 'Please search a flight',
      noflights: 'Sorry, no flights available',
      departure: 'Departure',
   };
   public static patterns = {
      number: /^[1-9]\d*$/
   };
   public static URL = {
      apiUrl: '../assets/data/flight-data.json',
   };
}
