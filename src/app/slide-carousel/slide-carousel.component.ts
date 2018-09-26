import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'ngbd-carousel-basic',
  templateUrl: './slide-carousel.component.html',
  styleUrls: ['./slide-carousel.component.scss']
})
export class SlideCarouselComponent implements OnInit {
  images;

  constructor(private imageService: ImageService, private errorService: ErrorService) { }

  ngOnInit() {

    this.imageService.getImageUrls()
      .subscribe(
        urls => this.images = urls,
        error => this.errorService.handleError(error)
      );
  }

}
