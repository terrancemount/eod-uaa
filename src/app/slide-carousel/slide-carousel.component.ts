import { Component, OnInit, Sanitizer, SecurityContext } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ErrorService } from '../services/error.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'carousel',
  templateUrl: './slide-carousel.component.html',
  styleUrls: ['./slide-carousel.component.scss']
})
export class SlideCarouselComponent implements OnInit {
  urls: string[];
  loopIndex = 0;
  sensorIndex = 1;
  timer;



  constructor(private router: Router,
    private sanitizer: DomSanitizer,
    private imageService: ImageService,
    private errorService: ErrorService,
    private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://engineering-on-display.github.io/carousel/carousel.json')
      .subscribe(data => {
        this.urls = data['images']
      });

  }

  startTimer() {
    this.timer = setInterval(() => {
      this.loopIndex++;

      if (this.loopIndex % 2) {
        this.sensorIndex++;
        if (this.sensorIndex >= 4) {
          this.sensorIndex = 1;
        }
      }

      if (this.loopIndex >= this.urls.length)
        this.loopIndex = 0;
    }, 8000)
  }

  onClick() {
    this.router.navigate(["dashboard"]);
  }

  trustStyle(url){
    return this.sanitizer.bypassSecurityTrustStyle(`url("${url}")`);
  }
}
