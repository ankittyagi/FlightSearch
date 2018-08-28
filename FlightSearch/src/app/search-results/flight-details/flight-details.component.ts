import { Component, Input } from '@angular/core';
import { Flight } from '../../models/flights';
import { Constants } from '../../utils/constants';

@Component({
   selector: 'app-flight-details',
   templateUrl: './flight-details.component.html',
   styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent {

   @Input() forwardFlight: Flight;
   @Input() returnFlight: Flight;
   @Input() numberOfPassengers: number;
   labels = Constants.labels;

   constructor() { }

}
