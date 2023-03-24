import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

  @Input() loginData = { Username:" ", Password:" " };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {}

  loginUser(): void {

    this.fetchApiData.userLogin(this.loginData).subscribe((response) => {

      console.log("loginUser", response);

      // save the user login data in localStorage
      localStorage.setItem("username", response.user.Username);
      localStorage.setItem("token", response.token);

      this.dialogRef.close();

      this.snackBar.open("Login was successful!", "Ok", {
        duration: 2000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response.message, "Ok", {
        duration: 2000
      });
    });
  }
}
