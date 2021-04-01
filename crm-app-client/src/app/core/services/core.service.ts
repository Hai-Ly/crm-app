import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Property, Confirm } from '../models';
import { Observable, Subject } from 'rxjs';
import { PropertyUpdateFormComponent, LoadingComponent, ConfirmComponent } from '../components';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';


@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private spinnerTopRef = this.cdkSpinnerCreate();
  private spin$: Subject<boolean> = new Subject();

  constructor(private dialogService: MatDialog, private overlay: Overlay) { }

  openUpdateDialog(properties:Property[]) : Observable<any> {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '540px';
    dialogConfig.height = 'auto';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.data = { props: properties };
    
    return this.dialogService.open(PropertyUpdateFormComponent, dialogConfig).afterClosed();
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-dark-backdrop', //'cdk-overlay-transparent-backdrop',
        positionStrategy: this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically()
    });
  }

  private showSpinner() {
      if (!this.spinnerTopRef.hasAttached()) {
          this.spinnerTopRef.attach(new ComponentPortal(LoadingComponent));
      }
  }

  private stopSpinner() {
      if(this.spinnerTopRef.hasAttached()) {
          this.spinnerTopRef.detach() ;
      }
  }

  showLoading() {
      this.spin$.next(true);
  }

  unShowLoading() {
      this.spin$.next(false);
  }

  static DeleteProductConfirm:Confirm = {
    title: 'Delete The Product',
    content: 'Are you sure you want to delete this product?'
  }

  static DeleteItemConfirm:Confirm = {
    title: 'Delete Item',
    content: 'Are you sure you want to delete this item?'
  }

  static EditProductConfirm:Confirm = {
    title: 'Edit The Product',
    content: 'Are you sure you want to edit this product?'
  }

  static EditBlogConfirm:Confirm = {
    title: 'Edit The Blog',
    content: 'Are you sure you want to edit this blog?'
  } 

  openConfirmDialog(con:Confirm) : Observable<boolean> {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '540px';
    dialogConfig.height = 'auto';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.data = { confirm: con };
  
    return this.dialogService.open(ConfirmComponent, dialogConfig).afterClosed();
  }
}
