import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FlightDetailsComponent } from './search-results/flight-details/flight-details.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultsComponent,
    FlightDetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
