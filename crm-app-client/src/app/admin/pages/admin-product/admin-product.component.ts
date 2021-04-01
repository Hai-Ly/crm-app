import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Product, ProductService, EditorMode } from 'src/app/core';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { CoreService } from 'src/app/core/services/core.service';
import { Subscription, EMPTY } from 'rxjs';
import { ProductEditorDialogComponent } from '../../components/product-editor-dialog/product-editor-dialog.component';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'crm-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;

  newProduct: any;
  activeProduct: Product|undefined;

  displayedColumns: string[] = ['actions', 'name', 'price'];
  dataSource!: MatTableDataSource<Product>;

  subscriptions: Subscription[] = [];

  constructor(private dialog: MatDialog, private overlay: Overlay,
    private productService: ProductService, private coreService: CoreService) {

  }

  ngOnInit() {
    this.subscriptions.push(
      this.productService.getProducts().subscribe(
      products => {
        console.log(products);
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
      }
    ));
  }

  ngOnDestroy(): void {
    while (this.subscriptions.length > 0) {
      this.subscriptions.pop()!.unsubscribe();
    }
  }

  applyFilter(target: EventTarget|null) {

    this.dataSource.filter = (<HTMLInputElement>target).value.trim().toLowerCase();
  }

  openProductEditorDialog(product: Product|undefined): void {

    const dialogRef = this.dialog.open(ProductEditorDialogComponent, {
      width: '800px',
      height: 'auto',
      disableClose: true,
      autoFocus: true,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      data: product ? {mode: EditorMode.Update, product} : {mode: EditorMode.Create, product}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        if (result.mode === EditorMode.Create) {
          this.addRowData(result.course);
        } else {
          this.updateRowData(result.course);
        }
      }
    });
  }

  deleteProduct(product: Product ): void {
    this.coreService.openConfirmDialog(CoreService.DeleteProductConfirm).pipe(
      switchMap(yes => {
        if (yes) {
          return this.productService.deleteProduct(product.id);
        } else {
          return EMPTY;
        }
      }),
      tap(() => this.deleteRowData(product))
    ).subscribe ();
  }


  addRowData(product: Product): void {
    this.dataSource.data.push(product);
    this.refreshTable();
  }

  updateRowData(product: Product): void {
    const i = this.dataSource.data.findIndex( el => el.id === product.id );
    if (i !== -1) {
      this.dataSource.data[i] = product;
      this.refreshTable();
    }
  }

  deleteRowData(product: Product): void {

    const i = this.dataSource.data.findIndex( el => el.id === product.id );
    if (i !== -1) {
      this.dataSource.data.splice (i, 1);
      this.refreshTable();
    }
  }

  private refreshTable(): void {
    this.dataSource.sort = this.sort;
    this.table.renderRows();
  }

}
