import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-main-carousel-food',
  templateUrl: './main-carousel-food.component.html',
  styleUrls: ['./main-carousel-food.component.sass']
})
export class MainCarouselComponentFood implements OnInit {

  @Input('slides') slides: Array<any> = [];
  contentLoaded = false;
  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };
  constructor() { }

  ngOnInit() { 
    setTimeout(() => {
      this.contentLoaded = true;
    }, 3000);
  }

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
