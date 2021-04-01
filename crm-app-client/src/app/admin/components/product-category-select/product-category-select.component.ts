import { Component, OnInit } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Category, ProductService, AllCategory } from 'src/app/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';

interface CatFlatNode {
  id: string;
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'crm-product-category-select',
  templateUrl: './product-category-select.component.html',
  styleUrls: ['./product-category-select.component.scss']
})
export class ProductCategorySelectComponent implements OnInit {

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<CatFlatNode, Category>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<Category, CatFlatNode>();

  catSubscription: Subscription;
  categories: Category[] = [];
  renameId: string = '';
  isCreating: boolean = false;
  
  /** The selection for checklist */
  checklistSelection = new SelectionModel<CatFlatNode>(true /* multiple */);

  private transformer = (cat: Category, level: number) => {

    const existingNode = this.nestedNodeMap.get(cat);
    const flatNode = existingNode && existingNode.id === cat.id ? existingNode : {
      id: cat.id,
      expandable: !!cat.children,
      name: cat.name,
      level: level,
    };;

    flatNode.level = level;
    flatNode.expandable = !!cat.children;

    this.flatNodeMap.set(flatNode, cat);
    this.nestedNodeMap.set(cat, flatNode);
    return flatNode;
  }

  treeControl: FlatTreeControl<CatFlatNode>;

  treeFlattener: MatTreeFlattener<Category, CatFlatNode>;

  dataSource: MatTreeFlatDataSource<Category, CatFlatNode>;

 
  constructor(private productService: ProductService) { 
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<CatFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = [];
    this.catSubscription = this.productService.getCategories().subscribe(
      cats => {
        this.categories = cats;
        this.dataSource.data = this.toTreeViewForm(cats);
      }
    )
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    if(this.catSubscription) {
      this.catSubscription.unsubscribe();
    }
  }

  getLevel = (node: CatFlatNode) => node.level;

  isExpandable = (node: CatFlatNode) => node.expandable;

  getChildren = (node: Category): Category[]|undefined => node.children;

  hasChild = (_: number, _nodeData: CatFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: CatFlatNode) => _nodeData.name === '';

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
      if(cat.parent !== undefined) {
        const node = treeData.find(catLv1 => catLv1.id === cat.parent)
        if(node) {
          if(node.children === undefined) {
            node.children = [];
          }
          node.children.push({...cat});
        }
      }
    })

    return treeData;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: CatFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: CatFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  catItemSelectionToggle(node: CatFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  catLeafItemSelectionToggle(node: CatFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: CatFlatNode): void {
    let parent: CatFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: CatFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: CatFlatNode): CatFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  addNewItem(node: CatFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    parentNode?.children?.push({id:'',name:''});
    this.dataSource.data = this.dataSource.data; // trigger
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: CatFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    if(nestedNode) {
      // TODO create new categogry
      nestedNode.id = "asd";
      nestedNode.name = itemValue;
      this.dataSource.data = this.dataSource.data; // trigger
    }
  }
}
