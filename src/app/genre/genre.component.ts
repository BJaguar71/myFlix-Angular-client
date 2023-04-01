import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  constructor(
    // inject the material dialog for displaying genre's data
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string
    }){}

  ngOnInit(): void {}
}
