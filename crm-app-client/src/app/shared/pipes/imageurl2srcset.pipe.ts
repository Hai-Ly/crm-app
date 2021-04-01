import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageurl2srcset'
})
export class Imageurl2srcsetPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
