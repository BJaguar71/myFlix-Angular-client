import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = {};
  initialInput: any = {};
  @Input() updatedUser = {
    Username: "",
    Password: "",
    Email: "",
    Birthdate: "",
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Function to fetch user information with API call and the getUser method in fetchApiDataService component
   * @returns user object with user data in JSON
   * @function getUserInfo
   */

  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);

      this.updatedUser.Username = this.user.Username;
      this.updatedUser.Password = this.user.Password;
      this.updatedUser.Email = this.user.Email;
      this.updatedUser.Birthdate = this.user.Birthdate;

      console.log(this.updatedUser);
      return this.user;
    });
  }

  /**
   * Function to update the user information such as username, password, email or birthdate through an API call and the editUser method inside the fetchApiDataService component
   * @returns successfull message
   * @function updateUserInfo
   */

  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      this.snackBar.open("Your information was successfully updated!", "Ok", {
        duration: 2000,
      });
      // check if the username in localstorage is not equal to the result username then clear local storage and redirect the user to the welcome page for new login
      if (this.user.Username !== result.Username) {
        localStorage.clear();
        this.router.navigate(["welcome"]);
        this.snackBar.open("Your information was successfully updated, please loging with your new data again to be able tto see the list of movies.", "Ok",
          {
            duration: 2000,
          }
        );
      }
    });
  }

  /**
   * Function to remove a user from database and also from the local storage/ deregistering a user - through API call and the deleteUser method inside fetchApiDataService component
   * @returns successfull message
   * @function deleteAccount
   */

  deleteAccount(): void {
    if (confirm("All your data as well as the movies added to your favorite list will be lost. Please note that this action cannot be undone!")) {
      this.router.navigate(["welcome"]).then(() => {
        this.snackBar.open("Your account was successfully removed. Please note that this action cant be undone.", "Ok",
          {
            duration: 2000,
          }
        );
      });
    }
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
      localStorage.clear();
    });
  }

}
