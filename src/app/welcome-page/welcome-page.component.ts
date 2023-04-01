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

  /**
   * A function that is responsible for opening a registration form as a dialog when the user pushes "Sign Up" button 
   * @function openUserRegistrationDialog
   */

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {

      // assigning the dialog a width
      width: "300px"
    });
  }

  /**
   * A function that is responsible for opening a login form as a dialog when the user pushes "login" button
   * @function openUserLoginDialog
   */

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: "300px"
    })
  }

}
