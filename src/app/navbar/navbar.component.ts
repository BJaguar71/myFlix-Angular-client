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
  constructor(
    public router: Router,
    public dialog: MatDialog,
    ){}
  ngOnInit(): void {}

  // navigate to different views from navbar
  toMovies(): void {
    this.router.navigate(["movies"]);
  }

  toProfile(): void {
    this.dialog.open(UserProfileComponent, {
      width: "100%",
      height: "100%",
    });
  }

  // toGenres(): void {
  //   this.router.navigate(["genres"]);
  // }

  // logs out the user, clears the local storage and navigates the user to the welcome page
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.clear();
  }
}
