export interface Property {
    name: string;
    value: string;
    type: PropertyType;
}

export enum PropertyType{
    Text=1,
    CheckBox=2,
}

export enum ScreenSize {
    XS = 1,
    SM,
    MD,
    LG,
    XL
}

export interface Confirm {
    title: string;
    content: string;
}

export enum EditorMode {
    Create = 0,
    Update = 1
}