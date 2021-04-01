export interface SorlResult {
    responseHeader:{
        status:number;
        QTime:number;
        params:any;
    };
    response?: {
        numFound:number;
        start:number;
        maxScore:number;
        docs:any[];
    }
    suggest?: {
        productSuggester?: any;
    }
    error? : {
        metadata:any;
        msg:string;
        code:number;
    }
}

export interface Suggestion {
    term:string;
    weight:number;
}