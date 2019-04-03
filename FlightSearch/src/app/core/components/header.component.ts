
import { Component } from '@angular/core';
import { Constants } from './../../utils/constants';
@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
   labels = Constants.labels;
   title = this.labels.appTitle;
   constructor() { }

}
