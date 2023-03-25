import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

  @Input() loginData = { Username: " ", Password: " " };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void { }

  loginUser(): void {

    this.fetchApiData.userLogin(this.loginData).subscribe((result) => {

      // save the user login data in localStorage
      let user = result.user.Username;
      let token = result.token;

      localStorage.setItem("user", user);
      localStorage.setItem("token", token);

      console.log(user, token);

      // logic for successful user login
      this.dialogRef.close();
      //  once the user is successfully logged-in then change the route to the /movies
      this.router.navigate(["movies"]);
      this.snackBar.open("Login was successful!", "Ok",
        { duration: 2000 });
    },
      (result) => {
        this.snackBar.open(result, "Ok", {
          duration: 2000
        });
      });
  }
}
