import { Component, OnInit, Input, HostListener , ViewChild, ElementRef } from '@angular/core';

type  ImageBlockItem = {
  url:{[key:string]:string}
}

@Component({
  selector: 'crm-product-image-viewer',
  templateUrl: './product-image-viewer.component.html',
  styleUrls: ['./product-image-viewer.component.scss']
})
export class ProductImageViewerComponent implements OnInit {

  private _imageItems:ImageBlockItem[] = [];

  @Input()
  set imageItems(imgs:ImageBlockItem[]) {
    this._imageItems = imgs;

    if(this._imageItems && this._imageItems.length > 0) {
      this.activeIndex = 0;
      this.activeItem = this.imageItems[0];
    }
  }

  get imageItems() : ImageBlockItem[] {
    return this._imageItems || [];
  }

  @ViewChild ('mainImage', {read:ElementRef}) mainImage!:ElementRef;
  @ViewChild ('largeImage', {read:ElementRef}) largeImage!:ElementRef;

  activeItem!:ImageBlockItem;
  activeIndex!: number ;
  isDoMagnifier!: boolean;

  magnifierLen = { width:190, height:90, x:0, y:0 };
  zoomWindow= {width: 0, height:0, x:0, y:0, maxHeight:500 };
  zoomPos = {x: 0, y:0};
  _wWidth:number = 0;
  _wHeight:number = 0;

  constructor() { 
    
  }

  ngOnInit() {
    this.onResize();
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this._wWidth = window.innerWidth;
    this._wHeight = window.innerHeight;
  }

  onActive(index:number) {
    this.activeIndex = index;
    this.activeItem = this.imageItems[index];
  }

  startMagnifier(e:any) {
    const imgRect = this.mainImage.nativeElement.getBoundingClientRect();

    this.zoomWindow.x = imgRect.right + 10;
    this.zoomWindow.y = imgRect.top - 10;
    this.zoomWindow.width = this._wWidth - this.zoomWindow.x - 10 - 18; //TODO: hardcode
    this.zoomWindow.height = Math.min(this._wHeight - this.zoomWindow.y - 10 - 18, this.zoomWindow.maxHeight);
    
    const ew = this.largeImage.nativeElement.width/imgRect.width;
    const eh = this.largeImage.nativeElement.height/imgRect.height;
    this.magnifierLen.width = this.zoomWindow.width/ew;
    this.magnifierLen.height = this.zoomWindow.height/eh;
    this.isDoMagnifier = true;
  }


  moveMagnifier( e:any) {
    const imgRect = this.mainImage.nativeElement.getBoundingClientRect();

    let x = e.clientX - imgRect.left;
    const minX = this.magnifierLen.width/2;
    const maxX = imgRect.width - this.magnifierLen.width/2;

    if(x > maxX) {
      x = maxX;
    } else if(x < minX) {
      x = minX;
    }

    let y = e.clientY - imgRect.top;
    const minY = this.magnifierLen.height/2;
    const maxY = imgRect.height - this.magnifierLen.height/2;
    if(y > maxY) {
      y = maxY;
    } else if(y < minY) {
      y = minY;
    }

    this.magnifierLen.x = x - this.magnifierLen.width/2;
    this.magnifierLen.y = y - this.magnifierLen.height/2;

    this.zoomPos.x = -this.magnifierLen.x * this.largeImage.nativeElement.width/this.mainImage.nativeElement.width;
    this.zoomPos.y = -this.magnifierLen.y * this.largeImage.nativeElement.height/this.mainImage.nativeElement.height;
  }

  stopMagnifier() {
    this.isDoMagnifier = false;
  }

}
