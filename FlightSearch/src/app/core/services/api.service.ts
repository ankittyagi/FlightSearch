

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Flight } from '../../flight-search/models/flights';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../../utils/constants';

/**
* API service to make all http calls through app
*/
@Injectable()
export class ApiService {

   constructor(private http: Http) { }

   /**
   * Fetch data from JSON file and return flight array object
   */
   public getAll(): Promise<Flight[]> {
      return this.http.get(Constants.URL.apiUrl).toPromise().then(data => {
         return Promise.resolve(data.json().flights);
      })
      .catch(Promise.reject);
   }
}
