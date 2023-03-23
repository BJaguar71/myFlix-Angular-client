import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// HttpClient
import { HttpClientModule } from "@angular/common/http";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// material imports

//  form input
import { MatInputModule } from "@angular/material/input";
// form button
import { MatButtonModule } from "@angular/material/button";
// form card
import { MatCardModule } from "@angular/material/card";
// form-field
import { MatFormFieldModule } from "@angular/material/form-field";
// dialog
import { MatDialogModule } from "@angular/material/dialog";
// snack bar
import { MatSnackBarModule } from "@angular/material/snack-bar";
// form
import { FormsModule } from "@angular/forms";
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';


@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
