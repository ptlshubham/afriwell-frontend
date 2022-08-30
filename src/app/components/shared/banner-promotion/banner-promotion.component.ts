import { Component, OnInit } from '@angular/core';
import { Webbanners } from '../../user-models/webhome.model';
import { UserHomeService } from '../../user-service/home.services';

@Component({
  selector: 'app-banner-promotion',
  templateUrl: './banner-promotion.component.html',
  styleUrls: ['./banner-promotion.component.sass']
})
export class BannerPromotionComponent implements OnInit {
  public Banners: Webbanners[] = [];
  public endBanners = [];

  constructor(
    private userHomeService: UserHomeService
  ) { }
  contentLoaded = false;
  ngOnInit() {
    this.getBanners();
    setTimeout(() => {
      this.contentLoaded = true;
    }, 3000);
  }
  getBanners() {
    this.endBanners = [];
    this.userHomeService.getWebSlider().subscribe((data: any) => {
      this.Banners = data;
      this.Banners.forEach(element => {
        if (element.name == 'End') {
          let data = {
            image: element.bannersimage,
            title: element.title,
            subtitle: element.subtitle
          }
          this.endBanners.push(data);
        }
      })
    });
  }
}
