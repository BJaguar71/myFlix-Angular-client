import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
// import router
// it helps to define different paths and conncet the different comps
import { RouterModule, Routes } from  "@angular/router";

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
// icon
import { MatIconModule } from "@angular/material/icon";

// form
import { FormsModule } from "@angular/forms";

// import app's components
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { GenreComponent } from './genre/genre.component';
import { DirectorComponent } from './director/director.component';
import { MovieSummaryComponent } from './movie-summary/movie-summary.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



// defining routes here
const appRoutes: Routes = [
  // welcome route that'll point to a WelcomePageComponent that will act as a welcome page with sign-up and login options for users.
  { path: "welcome", component: WelcomePageComponent },
  // movies route that points to the MovieCard comp with the list of all movies in a form of a card
  // add `this.router.navigate(['movies']);` to the user login comp to make the defined routing for movies work as expected
  { path: "movies", component: MovieCardComponent },
  { path: "genres", component: GenreComponent },
  { path: "directors", component: DirectorComponent },
  // defined a route that points to the welcome path as default when the route in empty
  { path: " ", redirectTo: "welcome", pathMatch: "prefix" },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    GenreComponent,
    DirectorComponent,
    MovieSummaryComponent,
    NavbarComponent,
    UserProfileComponent
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
    FormsModule,
    // by this syntax we are telling the routing module to work with all the paths inside appRoutes
    RouterModule.forRoot(appRoutes),
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
