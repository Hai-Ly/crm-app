import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Observable, Subject, Subscription, of } from 'rxjs';
import { filter, tap, switchMap, debounceTime, distinctUntilChanged, catchError, merge } from 'rxjs/operators';

import { Category, Product, Suggestion } from '../../models';
import { ProductService } from '../../services';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'crm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {

 
  @ViewChild('searchBox') searchBox!:NgSelectComponent;

  activeScopeId!: string;
  activeScopeLabel!: string;

  private _activeScope!:Category;
  get activeScope():Category|undefined {
    return this._activeScope;
  }
  set activeScope(scope :Category|undefined) {
    if(scope) {
      this._activeScope = scope;
      this.activeScopeId = scope.id;
      this.activeScopeLabel = scope.name;
      console.log('activeScopeLabel: ' + this.activeScopeLabel);
    }
  }

  private _activeScopeId!:string;

  searchText!:string;
  
  categories: Category[]|undefined;
  selectedSuggestion!: Product;
  suggestions$: Observable<Suggestion[]>;
  suggestionLoading = false;
  termInput$ = new Subject<string>();
  routerSubscription:Subscription;

  constructor(private router:Router, private productService: ProductService, private cd: ChangeDetectorRef) {

    this.routerSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      distinctUntilChanged(),
      tap((event: NavigationEnd) => {
        const urlTree = this.router.parseUrl(event.url);
        if(urlTree.queryParams.q) {
          this._activeScopeId = urlTree.queryParams.category_id;
           // TODO: review this.searchBox.filter(urlTree.queryParams.q, false);
          this.searchBox.filter(urlTree.queryParams.q);
        } else {
          // TODO: review
          // this.searchBox.clear(); // remove filter
        }
      })
      ,merge(this.productService.getCategories().pipe(tap(categories => this.categories = categories)))
    ).subscribe(data => {
        if(this.categories) {
          if(this._activeScopeId) {
            let scope = this.categories.find(category => category.id === this._activeScopeId); // assign root
            if(!scope) {
              //scope = this.categories.find(category => category.id === 0); // assign root
            }
            this.activeScope = scope;
          } else {
            //this.activeScope = this.categories.find(category => category.depth === 0); // assign root
          }
          
          if(this.activeScope) {
            
          }
        }
      },
      err => {console.log(err)}
    );

    this.suggestions$ = this.termInput$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.suggestionLoading = true),
      switchMap((term:string) => {
        if (!term) {
          this.suggestionLoading = false;
          return of([]);
        } else {
          return this.productService.getProductSuggestions(term, this._activeScope).pipe( 
            catchError(() => of([])),
            tap(() => this.suggestionLoading = false ))
        }
      })
    );              
  }

  ngOnInit() {
    //this.searchBox.notFoundTemplate = undefined as unknown as TemplateRef<any>;   
  }

  ngAfterViewInit() {
    const queryParams = this.router.routerState.snapshot.root.queryParams;
    if(queryParams) {
      this._activeScopeId = queryParams.category_id;
      if(queryParams.q) {
        // TODO: review this.searchBox.filter(urlTree.queryParams.q, false);
        this.searchBox.filter(queryParams.q);
        this.cd.detectChanges();
      }
    }
  }

  ngOnDestroy() {
    if( this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  onSelect(suggestion:Suggestion) {
    if (suggestion && suggestion.term) {
      this.navigate(suggestion.term);
      this.searchBox.isOpen = false; // close manually
    }
  }

  onEnter() {
    this.suggestionLoading = false;
    const term = this.searchBox.searchInput.nativeElement.value;
    if (term) {
      this.navigate(term);
      this.searchBox.isOpen = false; // close manually
    }
  }

  navigate(sTerm: string) {
    let queryParams:any = {q: sTerm};
    if(this.activeScope) {
      queryParams.category_id = this.activeScope.id;
    }

    this.router.navigate(['products'], {queryParams: queryParams});
  }

  onScopeChanged() {
    this.activeScope = this.categories?this.categories.find(category => category.id === this.activeScopeId) : undefined;
  }

}
