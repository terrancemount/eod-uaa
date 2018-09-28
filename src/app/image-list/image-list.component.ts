import { Component, OnInit } from '@angular/core';

import { ErrorService } from '../services/error.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {
  urls;
  constructor(private errorService: ErrorService, private http: HttpClient) { }

  ngOnInit() {

  }

  parseFilename(url) {
    const splitUrl = url.split('/');
    return splitUrl[splitUrl.length - 1];
  }
}
