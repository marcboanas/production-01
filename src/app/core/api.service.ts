import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { ENV } from './env.config';
import { LocationModel } from './models/location.model';

@Injectable()
export class ApiService {

  constructor(
  	private http: HttpClient,
  	private auth: AuthService
  ) { }

  private get _authHeader(): string {
  	return `Bearer ${localStorage.getItem('access_token')}`;
  }

  // GET list of public events
  getLocations$(): Observable<LocationModel[]> {
  	return this.http
  		.get(`${ENV.BASE_API}locations`)
  		.pipe(
  			catchError((error) => this._handleError(error))
  		);
  }

  // GET all locations- private and public (admin only)
  getAdminLocations$(): Observable<LocationModel[]> {
  	return this.http
  		.get(`${ENV.BASE_API}locations/admin`, {
  			headers: new HttpHeaders().set('Authorization', this._authHeader)
  		})
  		.pipe(
  			catchError((error) => this._handleError(error))
  		);
  }

  // GET a location by ID (login required)
  getLocationById$(id: string): Observable<LocationModel> {
  	return this.http
  		.get(`${ENV.BASE_API}location/${id}`, {
  			headers: new HttpHeaders().set('Authorization', this._authHeader)
  		})
  		.pipe(
  			catchError((error) => this._handleError(error))
  		);
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
  	const errorMsg = err.message || 'Error: Unable to complete request.';
  	if (err.message && err.message.indexOf('No JWT present') > -1) {
  		this.auth.login();
  	}
  	return Observable.throw(errorMsg);
  }
}
