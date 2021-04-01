import { Component, OnInit, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { UploadStatus, Image } from 'src/app/core';

@Component({
  selector: 'crm-image-upload-item',
  templateUrl: './image-upload-item.component.html',
  styleUrls: ['./image-upload-item.component.scss']
})
export class ImageUploadItemComponent implements OnInit {

  @Input() status!: UploadStatus<Image>;
  @Output() deleted = new EventEmitter<UploadStatus<Image>>();

  isHighlighted = false;
  isDeleting = false;

  get isUploading():boolean {
    if(!this.status.ok) {
      return false;
    }

    return this.status.progress < 100;
  }

  get isUploaded():boolean {
    return this.status.done;
  }


  constructor() { 
    
  }

  ngOnInit() {

  }

  onDelete() {
    this.isDeleting = true;
    this.deleted.emit(this.status);
  }


  @HostListener('mouseenter') 
  onMouseEnter() {
    this.isHighlighted = true;
  }

  @HostListener('mouseleave') 
  onMouseLeave() {
    this.isHighlighted = false;
  }

}
