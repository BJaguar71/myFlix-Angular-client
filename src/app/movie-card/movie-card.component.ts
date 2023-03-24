import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {

  // define the movie variable and the of its value; which is here an array of the type any
  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) {}

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
}
