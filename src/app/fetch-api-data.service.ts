import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
// import { UrlHandlingStrategy } from '@angular/router';

// Declaring the api url that will provide data for the client app
const apiUrl = "https://movie-api.fly.dev";

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
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // user login
  public userLogin(loginData: any): Observable<any> {

    return this.http
      .post(apiUrl + "/login", loginData)
      .pipe(catchError(this.handleError));
  }

  // A function to get all movies from API
  getAllMovies(): Observable<any> {

    // get the token from the local storage for authorization
    const token = localStorage.getItem("token");

    return this.http
      .get(apiUrl + "/movies", {
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
  getDirector(directorName: string, directorBio: string): Observable<any> {
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
  getUser(): Observable<any> {

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    return this.http
      .get(apiUrl + `/users/${username}`, {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${token}`,
          }
        )
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // get the array of favorite movies for a user
  getFavoriteMovies(): Observable<any> {

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    return this.http
    .get(`${apiUrl}/users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: `Bearer ${token}`
      }
    ),})
    .pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  //  add a movie to favorite list
  addFavoriteMovies(movieId: string): Observable<any> {

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    return this.http
      .post(`${apiUrl}/users/${username}/movies/${movieId}`,
        { FavoriteMovies: movieId },
        {
          headers: new HttpHeaders(
            {
              Authorization: `Bearer ${token}`
            }
          ),
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //  delete a movie from favorite list
  deleteFavoriteMovies(movieId: string): Observable<any> {

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    return this.http
      .delete(`${apiUrl}/users/${username}/movies/${movieId}`,
        {
          headers: new HttpHeaders(
            {
              Authorization: `Bearer ${token}`
            }
          )
        })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Edite user informatio
  editUser(updatedUser: any): Observable<any> {

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    return this.http
      .put(`${apiUrl}/users/${username}`, updatedUser, {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${token}`
          }
        ),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //  delete/de-register a user by username
  deleteUser(): Observable<any> {

    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    return this.http
      .delete(`${apiUrl}/users/${username}`, {headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}` 
        }
      )})
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //  error handler
  private handleError(error: HttpErrorResponse): any {

    if (error.error instanceof ErrorEvent) {
      console.error("Some error occured: ", error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }

    return throwError(() => new Error("Something bad happend; please try again later."));
  }

  //  none-type response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}