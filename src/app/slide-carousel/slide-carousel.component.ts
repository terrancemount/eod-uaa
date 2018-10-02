import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ChartComponent } from '../chart/chart.component';


@Component({
  templateUrl: './slide-carousel.component.html',
  styleUrls: ['./slide-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideCarouselComponent implements AfterViewInit, OnDestroy {



  @ViewChild(ChartComponent) chart;
  urls: string[];
  loopIndex = 0;
  sensorIndex = 1;
  slideTimer;
  refreshTimer;

  constructor(private router: Router,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private http: HttpClient) { }


  /**
   * Initialize the component by getting the list of images then starting
   * the timer for the slide show.
   */
  ngAfterViewInit() {
    //get the slides
    this.getSlides();

    //start the slide timer
    this.startTimer();

    //refresh the slides every hour incase there is a change pushed
    this.refreshTimer = setTimeout(() => {
      this.getSlides();
    }, 60 * 60 * 1000);
  }

  /**
   * Gets the slides for the carousel
   */
  getSlides() {
    this.http.get('https://engineering-on-display.github.io/carousel/carousel.json')
      .subscribe(data => {
        this.urls = data['images']
        this.cdr.detectChanges();
      });
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
    if (this.slideTimer) {
      clearInterval(this.slideTimer);
    }
  }

  /**
   * starts a timer loop for the slideshow
   */
  startTimer() {
    this.slideTimer = setInterval(() => {
      this.loopIndex++;

      //only allow for three sensor inputs 1 - 3 if loop index is even
      if (this.loopIndex % 2) {
        this.sensorIndex++;
        if (this.sensorIndex >= 4) {
          this.sensorIndex = 1;
        }
        this.chart.showSensor(this.sensorIndex);
      }

      if (this.loopIndex >= this.urls.length * 2) {
        this.loopIndex = 0;
      }

      this.cdr.detectChanges();
    }, 8000)
  }

  onClick() {
    clearInterval(this.slideTimer);
    clearTimeout(this.refreshTimer);
    this.router.navigate(["dashboard"]);
  }

  trustStyle(url) {
    return this.sanitizer.bypassSecurityTrustStyle(`url("${url}")`);
  }


}
