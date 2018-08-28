
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FlightDetailsComponent } from './search-results/flight-details/flight-details.component';

import { FlightService } from './services/flight.service';
import { ApiService } from './services/api.service';

@NgModule({
   declarations: [
      AppComponent,
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
   providers: [FlightService, ApiService],
   bootstrap: [AppComponent]
})
export class AppModule { }
