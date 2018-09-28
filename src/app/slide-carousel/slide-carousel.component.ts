import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ChartComponent } from '../chart/chart.component';

@Component({
  templateUrl: './slide-carousel.component.html',
  styleUrls: ['./slide-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideCarouselComponent implements AfterViewInit {

  @ViewChild(ChartComponent) chart;
  urls: string[];
  loopIndex = 0;
  sensorIndex = 1;
  timer;

  constructor(private router: Router,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private http: HttpClient) { }


  /**
   * Initialize the component by getting the list of images then starting
   * the timer for the slide show.
   */
  ngAfterViewInit() {
    this.http.get('https://engineering-on-display.github.io/carousel/carousel.json')
      .subscribe(data => {
        this.urls = data['images']
        this.cdr.detectChanges();
      });
    this.startTimer();
  }

  /**
   *
   */
  startTimer() {
    this.timer = setInterval(() => {
      this.loopIndex++;

      //only allow for three sensor inputs 1 - 3 if loop index is even
      if (this.loopIndex % 2) {
        this.sensorIndex++;
        if (this.sensorIndex >= 4) {
          this.sensorIndex = 1;
        }
        this.chart.showSensor(this.sensorIndex);
      }

      if (this.loopIndex >= this.urls.length * 2){
        this.loopIndex = 0;
      }

      this.cdr.detectChanges();
    }, 8000)
  }

  onClick() {
    clearInterval(this.timer);
    this.router.navigate(["dashboard"]);
  }

  trustStyle(url) {
    return this.sanitizer.bypassSecurityTrustStyle(`url("${url}")`);
  }
}
