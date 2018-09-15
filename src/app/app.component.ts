import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSlideShow:boolean = false;
  isTouched:boolean = false;
  title = 'EngineeringOnDisplay';

  enableSlideShow(){
    this.showSlideShow = true;
  }

  disableSlideShow(){
    this.showSlideShow = false;
  }
}
