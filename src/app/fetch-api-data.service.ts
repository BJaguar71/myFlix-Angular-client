import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

// Declaring the api url that will provide data for the client app
const apiUrl = "https://movie-api.fly.dev/";

// this decorator injects this service everywhere as a root
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  // inject thr HttpClient module to the constructor params
  // this will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }


  // register a new user 
  public userRegistration(userDetails: any): Observable<any> {

    console.log(userDetails);

    return this.http
      .post(apiUrl + "users", userDetails)
      .pipe(catchError(this.handleError));
  }

  // user login
  userLogin(userDetails: any): Observable<any> {

    console.log(userDetails);

    return this.http
      .post(`${apiUrl}/users/login/`, userDetails)
      .pipe(catchError(this.handleError));
  }

