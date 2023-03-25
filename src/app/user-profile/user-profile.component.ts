import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ){}
  
  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp; 
      console.log(resp);

      this.updatedUser.Username = resp.Username;
      this.updatedUser.Password = resp.Password;
      this.updatedUser.Email = resp.Email;
      this.updatedUser.Birthdate = resp.Birthdate;

      console.log(this.updatedUser);
      return this.user;
    });
  }

  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      this.snackBar.open("Your information was successfully updated!", "Ok", {
        duration: 2000,
      });
      // check if the username in localstorage is not equal to the result username then clear local storage and redirect the user to the welcome page for new login
      if(this.user.Username !== result.Username){
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

  deleteAccount(): void {
    this.fetchApiData.deleteUser().subscribe((result) =>{
      console.log(result);
      localStorage.clear();
      this.router.navigate(["welcome"]);
      this.snackBar.open("Your account was successfully removed. Please note that this action cant be undone.", "Ok", 
      {
        duration: 2000,
      }
      );
    })
  }
}
