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

  // A function to get all movies from API
  getAllMovies(): Observable<any> {

    // get the token from the local storage for authorization
    const token = localStorage.getItem("token");

    return this.http
      .get(apiUrl + "movies", {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${token}`
          }
        )
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // function to get one movie by title
  getMovie(title: string): Observable<any> {
    // get the token from the local storage for authorization
    const token = localStorage.getItem("token");

    return this.http
      .get(`${apiUrl}/movies/${title}`, {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${token}`
          }
        )
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // get director by name
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem("token");

    return this.http
      .get(`${apiUrl}/directors/${directorName}`, {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${token}`
          }
        )
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //  get a genre by name
  getGenre(genreName: string): Observable<any> {

    const token = localStorage.getItem("token");

    return this.http
      .get(`${apiUrl}/genres/${genreName}`, {
        headers: new HttpHeaders(
          {
            Authorizatoin: `Bearer ${token}`
          }
        )
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // get a user by username
  getUser(username: string): Observable<any> {

    const token = localStorage.getItem("token");

    return this.http
      .get(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${token}`
          }
        )
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // get the array of favorite movies for a user
  // getFavoriteMovies(): Observable<any> {

  //   const username = localStorage.getItem("user");
  //   const token = localStorage.getItem("token");

  //   return this.http
  //   .get(`${apiUrl}/users/${username}`, {headers: new HttpHeaders(
  //     {
  //       Authorization: `Bearer ${token}`
  //     }
  //   )})
  //   .pipe(
  //     map(this.extractResponseData),
  //     map((data) = > data.FavoriteMovies),
  //     catchError(this.handleError)
  //   );
  // }

