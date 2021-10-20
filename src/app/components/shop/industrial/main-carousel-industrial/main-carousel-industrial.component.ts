import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-main-carousel-industrial',
  templateUrl: './main-carousel-industrial.component.html',
  styleUrls: ['./main-carousel-industrial.component.sass']
})
export class MainCarouselIndustrialComponent implements OnInit {

  @Input('slides') slides: Array<any> = [];

  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(){
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      initialSlide: 5,
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide"
    }
  }




}
