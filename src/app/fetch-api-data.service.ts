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

  /**
   * @service to register new user using POST method
   * @param userDetails 
   * @typeParam {any}
   * @returns a new user object in a JSON format
   * @function userRegistration
   */

  public userRegistration(userDetails: any): Observable<any> {

    console.log(userDetails);

    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @service to login a user via POST method
   * @param loginData 
   * @typeParam {any}
   * @returns a JSON object with the login data of the user
   * @function userLogin
   */

  public userLogin(loginData: any): Observable<any> {

    return this.http
      .post(apiUrl + "/login", loginData)
      .pipe(catchError(this.handleError));
  }

  /**
   * @service to get all the movies from API via GET method 
   * @returns an array of the movie objects in JSON format
   * @typeParam {any}
   * @function getAllMovies
   */

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

  /**
   * @service to get information about a movie with its title via GET method
   * @param title 
   * @typeParam string
   * @returns a movie object in JSON format that its title matches the given param
   * @function getMovie
   */

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

  /**
   * @service to get data about a particular director with the director's name via GET method
   * @param directorName 
   * @typeParam string
   * @typeParam string
   * @param directorBio 
   * @returns an object in JSON format containig information about the director + an array of directed movies of the same director
   * @function getDirector
   */

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

  /**
   * @service to get information about a particular genre with its name via GET method
   * @param genreName 
   * @typaParam string
   * @returns an object in JSON format with information about the genere + an array of directed movies in the same genre
   * @function getGenre 
   */

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

  /***
   * @service to get information about the user by the username
   * @typeParam {any}
   * @return an object of the user data in JSON format
   * @function getUser
   */

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

  /**
   * @service to get all user's favorited movies via GET request 
   * @returns an array of movie ids 
   * @function getFavoriteMovies
   */

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

  /**
   * @service to add a movie to user's favorite movies list via POST request
   * @param movieId 
   * @typeParam string
   * @returns an object in JSON format containing the favorited movie id
   * @function addFavoriteMovies
   */

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

  /**
   * @service to delete a movie from user's favorited movies list via DELETE request
   * @param movieId 
   * @typeParam string
   * @returns a user object in JSON format with its favorited movies array that the deleted movie id is no longer there 
   * @function deleteFavoriteMovies
   */

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

  /**
   * @service to update user infomation via PUT method
   * @param updatedUser 
   * @typeParam {any}
   * @returns th user object in JSON format with updated information 
   * @function editUser
   */

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

  /**
   * @service to remove a user from database - deregister the user via DELETE request
   * @returns a success message
   * @function deleteUser
   */

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

  /**
   * Function to handdle errors when making the requests to the API endpoints
   * @param error 
   * @typePara {any}
   * @returns an error message
   */

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


  /**
   * Function to extract response data from HTTP response
   * @param res 
   * @typeParam {any}
   * @returns a response body or an empty object
   */

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}