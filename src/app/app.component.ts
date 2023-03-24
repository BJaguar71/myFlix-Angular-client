import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from "@angular/material/dialog";
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'myFlix-Angular-client';

  // pass MatDialog as an argument to be available to use in this component
  constructor(public dialog: MatDialog) {}

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
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: "500px"
    })
  }
}
