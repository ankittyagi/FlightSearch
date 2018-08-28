import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailsComponent } from './flight-details.component';
import { TimeOnlyFormatPipe } from './../../shared/pipes/time-only-format.pipe';
import { CityCodePipe } from '../../shared/pipes/city-code.pipe';

import { FormsModule } from '../../../../node_modules/@angular/forms';


describe('FlightDetailsComponent', () => {
  let component: FlightDetailsComponent;
  let fixture: ComponentFixture<FlightDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ FlightDetailsComponent, CityCodePipe, TimeOnlyFormatPipe ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDetailsComponent);
    component = fixture.componentInstance;
    component.forwardFlight = {
      flightID: '',
      departure: '',
      destination: '',
      time: {departure: '', destination: ''},
      cost: 0
      };
    component.returnFlight = {
      flightID: '',
      departure: '',
      destination: '',
      time: {departure: '', destination: ''},
      cost: 0
      };
    component.numberOfPassengers = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
