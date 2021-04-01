import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, throwError } from 'rxjs';
import { UploadStatus, Image } from '../models';
import { map, catchError } from 'rxjs/operators';
import { HttpEventType, HttpRequest, HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface ImageQuery {
  limit?:number;
  start?:number;
  filter?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor ( private apiService: ApiService, private http: HttpClient) {
    
  }

  /*
  getImages(q:ImageQuery): Observable<ImagesResult> {
    let sReq = '';

    let api = '/images';

    if(typeof q.start === 'number') {
      sReq += `&start=${q.start}`;
    }

    if(typeof q.limit === 'number') {
      if(sReq) { // not empty
        sReq +='&'
      }
      sReq += `limit=${q.limit}`;
    }

    if(q.filter) {
      for(let prop in q.filter) {
          if(sReq) { // not empty
            sReq +='&'
          }
          sReq += `${prop}=${q.filter[prop]}`;
      }
    }

    if(sReq) { // not empty
      api += `?${sReq}`;
    }
    
    console.log("api: " + api);
    return this.apiService.get(api);
  }
  */

  createImage(image: File):Observable<UploadStatus<Image>> {
    
    const form = new FormData();

    form.append('image', image, image.name);
    
    const req = new HttpRequest('POST', `${environment.apiUrl}/images`, form, {
      reportProgress: true
    });

    // The `HttpClient.request` API produces a raw event stream
    // which includes start (sent), progress, and response events.
    let uploadStatus:UploadStatus<Image> = {f: image, ok:true, progress:0, done:false};
    return this.http.request(req)
          .pipe ( map((event: HttpEvent<any>) => {
            
            
            switch (event.type) {
              case HttpEventType.Sent:
                break;
              case HttpEventType.UploadProgress:
                if(event.total) {
                  uploadStatus.progress =  Math.round(100 * event.loaded / event.total);
                }                
                break;
              case HttpEventType.Response:
                uploadStatus.progress = 100;
                uploadStatus.done = true;
                uploadStatus.respone = event.body;
                break;
              default:
                break;
            }
           
            return uploadStatus; 
          }),
          catchError( err => {
            // TODO: review
            return throwError(err);
          }) 
        );
  }

  deleteImage(id: String):Observable<String> {
    return this.apiService.delete(`/images/${id}`);
  }
}
