import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadStatus, Image } from '../../../core/models';
import { ImageService } from '../../../core/services';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'crm-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  @Input() fileUploads: UploadStatus<Image>[]=[];
  @Input() limit:number=8;
  @Input() column:number=4;
  @Input() owner:any;
  
  @Output() event:EventEmitter<string> = new EventEmitter();
  
  createImageSuccessSubscription: Subscription;
  private createImageSuccess = new Subject<UploadStatus<Image>>();
  constructor(private imageService:ImageService) { 
    this.createImageSuccessSubscription = this.createImageSuccess.subscribe(
      (status) => {
       
        let i = this.fileUploads.findIndex(el => el.f === status.f)
        if(i !== -1) {
          this.fileUploads[i] = {...status};
        }
       
        if(this.fileUploads.find(el => el.done === false) === undefined) {
          this.event.emit('completed');
        }
      }
    )
  }

  ngOnInit() {
   
  }

  ngOnDestroy() {
    if(this.createImageSuccessSubscription) {
      this.createImageSuccessSubscription.unsubscribe();
    }
  }

  upload(event:Event) {
    event.stopPropagation();
 
    const selectedFiles = (event.target as HTMLInputElement).files;
    if(selectedFiles) {
      if(!this.limit || this.fileUploads.length + selectedFiles.length <= this.limit )
      {
        this.event.emit('uploading');
        for (var i = 0; i < selectedFiles.length; i++) {
          this.fileUploads.push({f:selectedFiles[i], ok:false, done: false, progress: 0});
          this.imageService.createImage(selectedFiles[i]).subscribe(
            status => { 
              this.createImageSuccess.next(status);
            },
            err => {
              //TODO: error
            }
          );
        }
      } else {
        this.event.emit('limiterror');
      }
    }

  }

  onDeleted(index: number) {
    console.log("delete file: " + index);
    this.imageService.deleteImage(this.fileUploads[index].respone!.id).subscribe(
      () => this.fileUploads.splice(index, 1)
    );
  }

}
