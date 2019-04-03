
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header.component';

import { FlightSearchModule } from './flight-search/flight-search.module';


@NgModule({
   declarations: [
      AppComponent, HeaderComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      FlightSearchModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
