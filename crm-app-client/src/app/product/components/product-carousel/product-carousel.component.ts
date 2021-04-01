import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'crm-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnInit, OnChanges {

  @Input() imageItems: any[] = [];

  imgs:string[] = [];

  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 3, lg: 3, all: 0 },
    slide: 1,
    speed: 250,
    point: {
      visible: true
    },
    load: 2,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };
  
  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if(propName === 'imageItems') {
        let imgs:string[] = [];
        this.imageItems.forEach( url => {
          imgs.push( url.medium);
        });
        this.imgs = imgs;
        this.cdRef.detectChanges(); // use for fixing exception. Why ????
      }
    }
  }

}
