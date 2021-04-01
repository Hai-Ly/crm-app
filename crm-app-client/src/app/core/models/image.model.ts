export interface Image {

    id: string;
    url: {  
        default:string;
    };
    createdDate: string;
}


export interface ImagesResult {
    images:Image[],
    size:number;
    start:number,
    limit:number,
    total:number,
}

/*
var sizeMap = new Map([
    ['mini', 40],
    ['tiny', 80],
    ['small', 150],
    ['medium', 300],
    ['large', 450],
    ['big', 600],
    ['huge', 800],
    ['massive', 960]
  ]);
*/