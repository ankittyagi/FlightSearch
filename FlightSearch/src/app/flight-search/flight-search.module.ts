
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';

import { SearchComponent } from './components/search/search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { FlightSearchComponent } from './flight-search.component';

import { FlightService } from './services/flight.service';
import { ApiService } from '../core/services/api.service';


@NgModule({
   declarations: [
      FlightSearchComponent,
      SearchComponent,
      SearchResultsComponent,
      FlightDetailsComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      SharedModule
   ],
   exports: [FlightSearchComponent],
   providers: [FlightService, ApiService]
})
export class FlightSearchModule { }
