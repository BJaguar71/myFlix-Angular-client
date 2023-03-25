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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) {}

  // call the function that fetches movies here. ngOnIniti(); is called when angular is done creating the component 
  ngOnInit(): void {
    this.getMovies();
  }

  // a function that fetches the movies from fetchApiDataService with the help of getAllMovies();
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      console.log(this.movies);
      return this.movies;
    });
  }

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
}
