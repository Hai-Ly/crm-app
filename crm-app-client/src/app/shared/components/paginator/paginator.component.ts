import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'crm-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line: variable-name
  private _length = 0;

  @Input() set length(p: number){
    this._length = p;
    this.generatePages();
  }

  get length(): number {
    return this._length;
  }

  curPage = 0;
  pages: number[] = [];
  getCurPageSubscription: Subscription;

  constructor(private route: ActivatedRoute) {
    this.getCurPageSubscription = this.route.queryParamMap.subscribe( (params: ParamMap) => {

      const page = params.get('page') || '';
      let nPage = parseInt(page, 10);
      if (isNaN(nPage) || nPage < 1) {
        nPage = 1;
      }

      this.curPage = nPage;
      this.generatePages();
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.getCurPageSubscription) {
      this.getCurPageSubscription.unsubscribe();
    }
  }

  generatePages(): void {
    if (this._length < 6) {
      this.pages = Array.from({length: this._length}, (v, k) => k + 1);
    } else {
      const p: number[] = [1];

      if (this.curPage > 4) {
        p.push(0);
        if (this.curPage === this._length) {
          p.push(this.curPage - 2);
          p.push(this.curPage - 1);
          p.push(this.curPage);
        } else {
          p.push(this.curPage - 1);
          p.push(this.curPage);
          p.push(this.curPage + 1);
        }

      } else {
        p.push(2);
        p.push(3);
        if (this.curPage >= 3 ) {
          p.push(4);
          if (this.curPage === 4) {
            p.push(5);
          }
        }
      }

      if (this._length - this.curPage > 3) {
        p.push(0);
        p.push(this._length);
      } else if (this._length - this.curPage === 3 ) {
        p.push(this._length - 1);
        p.push(this._length);
      } else if (this._length - this.curPage === 2 ) {
        p.push(this._length);
      }

      this.pages = p;
    }
  }

}
