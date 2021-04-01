// import { Image } from "./image.model";

export interface Product {
    id: string;
    name: string;
    price?: number;
    categoryId?: string;
    thumbnail: string,
    images: any[],
    features?: string[];
    description?: string;
    details?: {name:string, value:string}[];
    createdBy?:string;
    createdDate?:string;
    lastModifiedBy?:string;
    lastModifiedDate?:string;
}

export interface ProductsResult {
    products:Product[],
    size:number;
    start:number,
    limit:number,
    total:number,
}

export enum ProductTag {
    Top ='top'
}
export enum ProductLayout {
    Grid = 1,
    List,
}

export enum ProductSortBy {
    Featured = 1,
    PriceL2H,
    PriceH2L,
    Newest
}

export const productDataTests:Product[] = [
    {id:'1', name:'Aegend Swim Goggles, Swimming Goggles No Leaking Anti Fog UV Protection Triathlon Swim Goggles with Free Protection Case for Adult Men Women Youth Kids Child, Multi-Choice', price: 22, thumbnail:'../../../assets/img/products/31x8TXeDqGL._AC_UL320_.jpg', images:[]},
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