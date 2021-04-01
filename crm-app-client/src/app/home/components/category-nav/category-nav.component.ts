import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

import { ProductService, AllCategory, Category} from '../../../core';
import { Subscription } from 'rxjs';

interface CatFlatNode {
  id: string;
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'crm-category-nav',
  templateUrl: './category-nav.component.html',
  styleUrls: ['./category-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoryNavComponent implements OnInit, OnDestroy {

  catSubscription: Subscription;
  categories: Category[] = [];
  private transformer = (cat: Category, level: number) => {
    return {
      id: cat.id,
      expandable: !!cat.children && cat.children.length > 0,
      name: cat.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<CatFlatNode>(node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private productService: ProductService) {
    this.catSubscription = this.productService.getCategories().subscribe(
      cats => {
        this.categories = cats;
        let rootNode = this.toTreeViewForm(cats);
        rootNode = [AllCategory].concat(rootNode);
        this.dataSource.data = rootNode;
        this.treeControl.expandAll();
        console.log(rootNode)
      }
    )
  }

  ngOnInit() {
     
  }

  ngOnDestroy() {
    if(this.catSubscription) {
      this.catSubscription.unsubscribe();
    }
  }

  hasChild = (_: number, node: CatFlatNode) => node.expandable;

  hasNoContent = (_: number, node: CatFlatNode) => node.name === '';

  // only support 2 level  
  private toTreeViewForm(dataset:Category[]) {
    // build tree data

    const treeData:Category[] = dataset.reduce<Category[]>((newArray, cat) => {
      if(!cat.parent) {
        newArray.push({...cat});
      }
      return newArray;
    }, []);

    dataset.forEach(cat => {
      console.log(cat);
      if(cat.parent !== undefined) {
        const node = treeData.find(catLv1 => catLv1.id === cat.parent)
        if(node) {
          if(node.children === undefined) {
            node.children = [];
          }
          node.children.push({...cat});
          console.log(node);
        }
      }
    })

    return treeData;
  }
 
}
