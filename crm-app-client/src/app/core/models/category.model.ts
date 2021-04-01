export interface Category {
  id: string;
  name: string;
  parent?:string;
  children?:Category[];
}


export const AllCategory:Category  = {
  id: 'all',
  name: 'All',
}