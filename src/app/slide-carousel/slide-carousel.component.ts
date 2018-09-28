import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ErrorService } from '../services/error.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngbd-carousel-basic',
  templateUrl: './slide-carousel.component.html',
  styleUrls: ['./slide-carousel.component.scss']
})
export class SlideCarouselComponent implements OnInit {
  urls: string[];
  loopIndex = 0;
  sensorIndex = 1;
  timer;



  constructor(private imageService: ImageService, private errorService: ErrorService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://engineering-on-display.github.io/carousel/carousel.json')
      .subscribe(data => {
        this.urls = data['images']
        this.startTimer();
      });

  }

  startTimer() {
    this.timer = setInterval(() => {
      this.loopIndex++;

      if (this.loopIndex % 2) {
        this.sensorIndex++;
        if (this.sensorIndex >= 4){
          this.sensorIndex = 1;
        }
      }

      if (this.loopIndex >= this.urls.length)
        this.loopIndex = 0;
    }, 8000)
  }
  stopTimer() {

  }

}
