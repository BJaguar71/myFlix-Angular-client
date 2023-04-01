import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorComponent } from '../director/director.component';
import { MovieSummaryComponent } from '../movie-summary/movie-summary.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {

  // define the movie variable and the of its value; which is here an array of the type any
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) {}

  // call the function that fetches movies here. ngOnIniti(); is called when angular is done creating the component 
  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Function to fetch movies from the API (fetchApiDataService) and storing them in the movies'state with the help of getAllMovies();
   * @function getMovies
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Function to open a particular genre from GenreComponent to read its information such as name and description
   * @param name 
   * @typeParam string
   * @param description
   * @typeParam string
   * @function openGenre 
   */

  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: "400px",
      height: "auto",
    });
  }

  /**
   * Function to open a particular director from DirectorComponent to read its information such as name and bio 
   * @param directorName 
   * @typeParam string
   * @param directorBio
   * @typeParam string
   * @function openDirector 
   */

  openDirector(directorName: string, directorBio: string): void{
    this.dialog.open(DirectorComponent, {
      data: {
        Name: directorName,
        Bio: directorBio,
      },
      width: "400px",
      height: "auto",
    });
  }

  /**
   * Function to open a particular movie summary from MovieSummaryComponent to read its information such as title and summary 
   * @param title 
   * @typeParam string
   * @param summary 
   * @typeParam string
   * @function openSummary
   */

  openSummary(title: string, summary: string): void {
    this.dialog.open(MovieSummaryComponent, {
      data: {
        Title: title,
        Summary: summary,
      },
      width: "400px",
      height: "auto"
    });
  }

  /**
   * Function to fetch the user info with API call (getUser function) which contains an array of ids of all the movies added to the favorite movies list by the user and setting the returned JSON into the favorites state
   * @return an array of movie ids
   * @function getFavorites 
   */

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      this.favorites = result.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    })
  }

  /**
   * Function to check if a movie is already added to the user's favorite list or not
   * @param id
   * @typeParam string 
   * @returns boolean
   * @function isFavorited
   */

  isFavorited(id: string): boolean {
   return this.favorites.includes(id);
  }

  /**
   * Function to add a movie'id to the array of favorite movies in the user object when the responsible button for it is clicked - through API call and addFavoriteMovies function in fetchApiDataService file
   * @param id 
   * @typeParam string
   * @returns successfull message
   */

  addToFavorites(id: string): void{
    console.log(id);

    this.fetchApiData.addFavoriteMovies(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open("Movie was successfully added to your list", "Ok", {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Function to remove a movie'id from the array of favorite movies in the user object when the responsible button for it is clicked - through API call and addFavoriteMovies function in fetchApiDataService file
   * @param id 
   * @typeParam string
   * @returns successfull message
   */

  deleteFromFavorites(id: string): void {
    console.log(id);

    this.fetchApiData.deleteFavoriteMovies(id).subscribe((result) => {
      console.log(result);

      this.snackBar.open("Movies was successfully removed from your list.", "Ok", {
        duration: 2000,
      });
      this.ngOnInit();
    })
  }
}