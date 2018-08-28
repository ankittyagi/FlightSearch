
import { Component } from '@angular/core';
import { FlightSearchParameters } from './models/flights';
import { Constants } from './utils/constants';
@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   labels = Constants.labels;
   title = this.labels.appTitle;
   flightSearchParameters: FlightSearchParameters;

   constructor() { }

   setFlightSearch(flightSearchParam: FlightSearchParameters) {
      this.flightSearchParameters = flightSearchParam;
   }
}
