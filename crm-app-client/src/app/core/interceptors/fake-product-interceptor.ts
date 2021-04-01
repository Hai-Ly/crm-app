import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Product, Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FakeProductInterceptor implements HttpInterceptor {

    private testProduct: Product = {
        id: "5c29e821d70e6639ec30fdb8",
        name: "ASICS Women's Gel-Venture 6 Running-Shoes",
        price: 50,
        features: [
            "Digital alarm clock with a 0.7-inch green LED display for easily checking the time at a glance",
            "Built-in nightlight gently illuminates a dark room",
            "Repeating snooze function makes it possible to sleep a little longer",
            "AC powered with integrated power supply; The battery power backup only for keep tracker the time and alarm in memory within 8 hours.",
            "Backed by an AmazonBasics 1-year limited warranty",
            "Note: Batteries are not included"
        ],
        description:"With a redesigned midsole and upper, our new GEL-Venture® 6 delivers excellent shock absorbing comfort, so you can take on the trail. Your tread will benefit from the rugged, one-piece outsole, featuring multi-directional lugs for confidence-inspiring traction. From above, durable synthetic material and a stitched-down toe bumper ensure great fit, protection and comfort.",
        categoryId:"5bffa296dd00ed0f68204fd3",
        images:[
            {
                id:"5c29e82cd70e6639ec30fdb9", 
                owner: "5c29e821d70e6639ec30fdb8",
                url: {
                    "40": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\40",
                    "96": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\96",
                    "192": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\192",
                    "288": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\288",
                    "384": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\384",
                    "480": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\480",
                    "576": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\576",
                    "672": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\672",
                    "768": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\768",
                    "864": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\864",
                    "default": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\default.jpg",

                }
            },
            {
                id: "5c29e82cd70e6639ec30fdba",
                owner: "5c29e821d70e6639ec30fdb8",
                url: {
                    "40": "uploads\\images\\5c29e82cd70e6639ec30fdba\\40",
                    "384": "uploads\\images\\5c29e82cd70e6639ec30fdba\\192",
                    "576": "uploads\\images\\5c29e82cd70e6639ec30fdba\\576",
                    "768": "uploads\\images\\5c29e82cd70e6639ec30fdba\\768",
                    "960": "uploads\\images\\5c29e82cd70e6639ec30fdba\\960",
                    "1152": "uploads\\images\\5c29e82cd70e6639ec30fdba\\1152",
                    "1344": "uploads\\images\\5c29e82cd70e6639ec30fdba\\1344",
                    "1536": "uploads\\images\\5c29e82cd70e6639ec30fdba\\1536",
                    "1728": "uploads\\images\\5c29e82cd70e6639ec30fdba\\1728",
                    "default": "uploads\\images\\5c29e82cd70e6639ec30fdba\\default.jpg",

                }
            },
            {
                id: "5c29e82cd70e6639ec30fdbb",
                owner: "5c29e821d70e6639ec30fdb8",
                url: {
                    "40": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\40",
                    "384": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\192",
                    "576": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\576",
                    "768": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\768",
                    "960": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\960",
                    "1152": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1152",
                    "1344": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1344",
                    "1536": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1536",
                    "1728": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1728",
                    "default": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\default.jpg",

                }
            }
        ],
        details:[
            {name: "Product Dimensions", value: "4.54 x 3.49 x 2.37 inches"},
            {name: "Shipping Weight", value: "8.2 ounces"},
            {name: "ASIN", value: "B07DQWT15Y"},
            {name: "Item model number", value: "AB20"},
            {name: "Date First Available", value: "April 9, 2019"},
            {name: "Manufacturer", value: "AmazonBasics"}
        ],
        thumbnail: "uploads\\images\\5c29e82cd70e6639ec30fdb9\\288"
    }

    private testProducts:Product[] = [
        {id:'1', name:'Aegend Swim Goggles, Swimming Goggles No Leaking Anti Fog UV Protection Triathlon Swim Goggles with Free Protection Case for Adult Men Women Youth Kids Child, Multi-Choice', price: 22, thumbnail:'../../../assets/img/products/31x8TXeDqGL._AC_UL320_.jpg',
            features: [
                "Digital alarm clock with a 0.7-inch green LED display for easily checking the time at a glance",
                "Built-in nightlight gently illuminates a dark room",
                "Repeating snooze function makes it possible to sleep a little longer",
                "AC powered with integrated power supply; The battery power backup only for keep tracker the time and alarm in memory within 8 hours.",
                "Backed by an AmazonBasics 1-year limited warranty",
                "Note: Batteries are not included"
            ],
            images:[
            {
                id:"5c29e82cd70e6639ec30fdb9", 
                owner: "5c29e821d70e6639ec30fdb8",
                url: {
                    "40": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\40",
                    "96": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\96",
                    "192": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\192",
                    "288": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\288",
                    "384": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\384",
                    "480": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\480",
                    "576": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\576",
                    "672": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\672",
                    "768": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\768",
                    "864": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\864",
                    "default": "uploads\\images\\5c29e82cd70e6639ec30fdb9\\default.jpg",

                }
            },
            {
                id: "5c29e82cd70e6639ec30fdba",
                owner: "5c29e821d70e6639ec30fdb8",
                url: {
                    "40": "uploads\\images\\5c29e82cd70e6639ec30fdba\\40",
                    "384": "uploads\\images\\5c29e82cd70e6639ec30fdba\\192",
                    "576": "uploads\\images\\5c29e82cd70e6639ec30fdba\\576",
                    "768": "uploads\\images\\5c29e82cd70e6639ec30fdba\\768",
                    "960": "uploads\\images\\5c29e82cd70e6639ec30fdba\\960",
                    "1152": "uploads\\images\\5c29e82cd70e6639ec30fdba\\1152",
                    "1344": "uploads\\images\\5c29e82cd70e6639ec30fdba\\1344",
                    "1536": "uploads\\images\\5c29e82cd70e6639ec30fdba\\1536",
                    "1728": "uploads\\images\\5c29e82cd70e6639ec30fdba\\1728",
                    "default": "uploads\\images\\5c29e82cd70e6639ec30fdba\\default.jpg",

                }
            },
            {
                id: "5c29e82cd70e6639ec30fdbb",
                owner: "5c29e821d70e6639ec30fdb8",
                url: {
                    "40": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\40",
                    "384": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\192",
                    "576": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\576",
                    "768": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\768",
                    "960": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\960",
                    "1152": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1152",
                    "1344": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1344",
                    "1536": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1536",
                    "1728": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1728",
                    "default": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\default.jpg",

                }
            },
            {
                id: "5c29e82cd70e6639ec30fdbc",
                owner: "5c29e821d70e6639ec30fdb8",
                url: {
                    "40": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\40",
                    "384": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\192",
                    "576": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\576",
                    "768": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\768",
                    "960": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\960",
                    "1152": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1152",
                    "1344": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1344",
                    "1536": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1536",
                    "1728": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1728",
                    "default": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\default.jpg",

                }
            },
            {
                id: "5c29e82cd70e6639ec30fdbd",
                owner: "5c29e821d70e6639ec30fdb8",
                url: {
                    "40": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\40",
                    "384": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\192",
                    "576": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\576",
                    "768": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\768",
                    "960": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\960",
                    "1152": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1152",
                    "1344": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1344",
                    "1536": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1536",
                    "1728": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\1728",
                    "default": "uploads\\images\\5c29e82cd70e6639ec30fdbb\\default.jpg",

                }
            }
            ],
            details:[
                {name: "Product Dimensions", value: "4.54 x 3.49 x 2.37 inches"},
                {name: "Shipping Weight", value: "8.2 ounces"},
                {name: "ASIN", value: "B07DQWT15Y"},
                {name: "Item model number", value: "AB20"},
                {name: "Date First Available", value: "April 9, 2019"},
                {name: "Manufacturer", value: "AmazonBasics"}
            ],},
        {id:'2', name:'XAegis Airsoft Goggles, Tactical Safety Goggles Anti Fog Military Glasses with 3 Interchangeable Lens for Paintball Riding Shooting Hunting Cycling', price: 30, thumbnail:'../../../assets/img/products/31x8TXeDqGL._AC_UL320_.jpg', images:[]},
        {id:'3', name:'Neiko 53875B Protective Safety Goggles Eyewear with Wide-Vision, ANSI Z87.1 Approved | Adjustable & Lightweight', price: 22, thumbnail:'../../../assets/img/products/61GzdcyYSAL._AC_UL320_.jpg', images:[]},
        {id:'4', name:'Swim Unisex-Adult Goggles Mirrored Vanquisher 2.0', price: 88, thumbnail:'../../../assets/img/products/31x8TXeDqGL._AC_UL320_.jpg', images:[]},
        {id:'5', name:'Swim Goggles, Swimming Goggles for Adult Men Women Youth Kids Child & Teen, Swim Glasses No Leaking Anti Fog Triathlon, with Mirrored & Waterproof, Clear Lenses, 2 Pack', price: 90, thumbnail:'../../../assets/img/products/61IS48q1ImL._AC_UL320_.jpg', images:[]},
        {id:'6', name:'Speedo Unisex-Adult Swim Goggles Hydrospex Classic', price: 100, thumbnail:'../../../assets/img/products/61ley30S4jL._AC_UL320_.jpg', images:[]},
        {id:'7', name:'Speedo 3 Pack Adult Swimming Goggles', price: 60, thumbnail:'../../../assets/img/products/71KoQv58x3L._AC_UL320_.jpg', images:[]},
        {id:'8', name:'NoCry Anti-Fog Vented Safety Goggles for Men and Women, with Clear Lenses, an Adjustable Headband and UV Protection, ANSI Z87.1 Approved', price: 50, thumbnail:'../../../assets/img/products/71ZCdAbNj7L._AC_UL320_.jpg', images:[]},
        {id:'9', name:'Uvex Ultra-Spec 2001 OTG (Over-the Glass) Visitor Specs Safety Glasses with Clear Uvextreme Anti-Fog Lens (S0112C)', price: 11, thumbnail:'../../../assets/img/products/512cDAF3X3L._AC_UL320_.jpg', images:[]},
        {id:'10', name:'AmazonBasics Safety Goggle - 1QP158A3 Anti-Fog, Clear Lens and Elastic Headband, 3-Count', price: 9, thumbnail:'../../../assets/img/products/717ujzGDI9L._AC_UL320_.jpg', images:[]},
    ]

    private testCategories: Category [] = [
        {id:'5bb5bbfee30008356953cfe9',name:'Vegetables'},
        {id:'5bffa296dd00ed0f68204fd3',name:'Fruits'},
        {id:'5bffa29add00ed0f68204fd4',parent:'5bffa296dd00ed0f68204fd3',name:'Apple'},
        {id:'5bffa2a1dd00ed0f68204fd5',parent:'5bb5bbfee30008356953cfe9',name:'Tomato'},
        {id:'5bffa2a7dd00ed0f68204fd6',parent:'5bffa296dd00ed0f68204fd3',name:'Potato'},
        {id:'5bffa2badd00ed0f68204fd9',parent:'5bffa296dd00ed0f68204fd3',name:'Banana'},
        {id:'5bffa2dddd00ed0f68204fdc',parent:'5bffa296dd00ed0f68204fd3',name:'Orange'},
        {id:'5bffa321dd00ed0f68204fdd',parent:'5bb5bbfee30008356953cfe9',name:'Onion'},
        {id:'5bffb1f32ee053393871c6c4',parent:'5bffb1e82ee053393871c6c3',name:'Node2.3.1'}
    ]

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            if (request.url.endsWith('/products/1') && request.method === 'GET') {
                console.log('FakeProductsInterceptor get /products/1');
                return of(new HttpResponse({ status: 200, body: this.testProduct }));
            } else if (request.url.endsWith('/products') && request.method === 'GET') {
                console.log('FakeProductsInterceptor get /products');
                return of(new HttpResponse({ status: 200, body: this.testProducts }));
            }  else if (request.url.endsWith('/categories') && request.method === 'GET') {
                console.log('FakeProductsInterceptor get /categories');
                return of(new HttpResponse({ status: 200, body: this.testCategories }));
            } 
            // pass through any requests not handled above
            return next.handle(request);
        })) 
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}