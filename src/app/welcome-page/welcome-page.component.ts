import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
// import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  // pass MatDialog as an argument to be available to use in this component
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  // the function that will open the dialog when th signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {

      // assigning the dialog a width
      width: "300px"
    });
  }

  // open login dialog
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: "300px"
    })
  }

  // open movies dialog
  // openMoviesDialog(): void {
  //   this.dialog.open(MovieCardComponent, {
  //     width: "500px"
  //   })
  // }

}
