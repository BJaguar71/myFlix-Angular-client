import { Component, OnInit, Input } from '@angular/core';

//  this import will be used to close dialog on success
import { MatDialogRef } from "@angular/material/dialog";

// this import brings in the API calls that is created in th file 'fetch-api-data.service.ts'
import { FetchApiDataService } from '../fetch-api-data.service';

//  this import is used to display notifications back to the user
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  // use the decorator the define the component's input and output
  @Input() userData = { Username: " ", Password: " ", Email: " ", Birthdate: " " };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) {}

    // the method is called once the component has received all its inputs
  ngOnInit(): void {
  }

  // the function that is reponsible for sending the form inputs to the backend
  registerUser(): void {
    
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // logic for a successful user registration:
      this.dialogRef.close(); // this will close modal on success
      console.log(result); // to check the result
      this.snackBar.open("Registration was successfull!", "Ok", {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, "Ok", {
        duration: 2000
      });
    });
  }

}
