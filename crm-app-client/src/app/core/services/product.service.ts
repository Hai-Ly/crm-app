import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { Product, ProductsResult, SorlResult, Suggestion } from '../models';
import { SolrService } from './solr.service';

export interface ProductsQuery {
  limit?:number;
  start?:number;
  fields?:string;
  category_id?:string;
}

export interface ProductsSearch {
  limit?:number;
  start?:number;
  q:string;
  filter?: any;
}

export const ProductsQueryDefault:ProductsQuery = {
  limit: 5,
  start: 0,
  category_id: undefined,
  fields: "_id,name,thumbnail,price"
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor ( private apiService: ApiService, private solrService: SolrService) {

    // cache category list.
    this.getCategories().subscribe(
      categories => console.log(categories),
      err => console.log(err)
    );
  }

  //private categoryListSubject = new BehaviorSubject<Category[]>([]);
  //public categoryList = this.categoryListSubject.asObservable();
  
  curProduct: Product|undefined;

  getCategories(): Observable<Category[]> {
    return this.apiService.get(`/categories`);
    //.pipe(tap(categories => this.categoryListSubject.next(categories)));
  }

  createCategory(data:any): Observable<Category> {
    return this.apiService.post(`/categories`, data);
  }

  updateCategory(id:String, data:any) :  Observable<Category> {
    return this.apiService.patch(`/categories/${id}`, data);
  }

  deleteCategory(id:String) {
    return this.apiService.delete(`/categories/${id}`);
  }

  createProduct(data:Product): Observable<Product> {
    return this.apiService.post(`/products`, data);
  }

  getProduct(id:string): Observable<Product> {
    return this.apiService.get(`/products/${id}`);
  }

  /*
  getProducts(opt:ProductsQuery): Observable<ProductsResult> {
      let sReq = ''

      if(typeof opt.start === 'number') {
        sReq += `start=${opt.start}`;
      }

      if(typeof opt.limit === 'number') {
        if(sReq) { // not empty
          sReq +='&'
        }
        sReq += `limit=${opt.limit}`;
      }

      if(typeof opt.fields === 'string') {
        if(sReq) { // not empty
          sReq +='&'
        }
        sReq += `fields=${opt.fields}`;
      }

      if(typeof opt.category_id === 'string') {
        if(sReq) { // not empty
          sReq +='&'
        }
        sReq += `category_id=${opt.category_id}`;
      }

      let api = '/products';
      if(sReq) { // not empty
        api += `?${sReq}`;
      }
      
      console.log("api: " + api);
      return this.apiService.get(api);
  }*/

  getProducts(): Observable<Product[]> {
    return this.apiService.get(`/products`);
  }
  
  updateProduct(id:string, data:any): Observable<any> {
    return this.apiService.put(`/products/${id}`, data);
  }

  updateManyProducts(data:any): Observable<any> {
    return this.apiService.patch(`/products`, data);
  }

  addTag(tags:string[], tag:string ) : string[] {
    if(!tags) {
      return [tag];
    }

    if(tags.indexOf(tag) === -1) {
      return tags.concat(tag);
    }

    return tags.slice(0);
  }

  removeTag(tags:string[], tag:string ) : string[] {
    if(!tags) {
      return [];
    }

    var filtered = tags.filter(function(value) {
      return value !== tag;
    });

    return filtered;
  }

  deleteProduct(id:string):Observable<any> {
    return this.apiService.delete(`/products/${id}`);
  }

  getProductSuggestions(term:string, category:Category|undefined): Observable<Suggestion[]> {
    let api = `/products/suggest?suggest.dictionary=productSuggester&suggest.q=${term}`;
    /*
    if(category && category.depth > 0) {
      let categoryId = category.id;
      const descendantIds = this.getListOfDescendantCategory(categoryId);
      descendantIds.forEach(id => categoryId += ` OR ${id}`);
      api += `&suggest.cfq=${categoryId}`;
    }*/
    return this.solrService.get(api).pipe(
      map( sorlResult => {
          if(sorlResult.suggest.productSuggester) {
            let ret = [];
            for (let prop in sorlResult.suggest.productSuggester) {
                const suggestions = sorlResult.suggest.productSuggester[prop].suggestions;
                if(suggestions) {
                  ret.push(...suggestions);
                }
            }
            return ret;
          }
          return [] ;
        }
      )
    );

  }

  searchProducts(opt:ProductsSearch): Observable<SorlResult> {
    let sReq = '';

    let sterm;
    if(opt.q == null) {
      sterm = '*';
    } else {
      sterm = `\"*${opt.q}*\"`;
    }

    let api = `/products/select?q=name:${sterm}`;

    if(typeof opt.start === 'number') {
      sReq += `&start=${opt.start}`;
    }

    if(typeof opt.limit === 'number') {
      if(sReq) { // not empty
        sReq +='&'
      }
      sReq += `rows=${opt.limit}`;
    }
    
    if(opt.filter) {
      for(let prop in opt.filter) {
          if(sReq) { // not empty
            sReq +='&'
          }
          sReq += `fq=${prop}:${opt.filter[prop]}`;
      }
    }

    if(sReq) { // not empty
      api += sReq;
    }
    
    console.log("api: " + api);

    return this.solrService.get(api);
  }
}
