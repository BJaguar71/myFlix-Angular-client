import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService} from "../fetch-api-data.service";
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from "@angular/material/dialog";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  user: any = localStorage.getItem("user");
  
  constructor(
    public router: Router,
    public dialog: MatDialog,
    ){}
  ngOnInit(): void {
  }

  /**
   * Navigate to the movies view - a list of movie cards is shown 
   * @function toMovies
   */

  toMovies(): void {
    this.router.navigate(["movies"]);
  }

  /**
   * Navigate to the user profile view - UserProfileComponent is rendered
   * @function toProfile 
   */

  toProfile(): void {
    this.router.navigate(["profile"]);
  }

  /**
   * Navigate to welcome page
   * @function toWelcome
   */

  toWelcome(): void {
    this.router.navigate(["welcome"]);
  }

  // logs out the user, clears the local storage and navigates the user to the welcome page
  /**
   * Function to log out the user from app, in other words, clearing the user info such as username and token from the local storage when the responsible button for it is clicked in the app UI
   * @function logout
   */

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.clear();
  }
}
