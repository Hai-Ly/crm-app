import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './pages/admin.component';
import { AdminProductComponent } from './pages/admin-product/admin-product.component';
import { AdminRoutingModule } from './admin.routing.module';
import { ProductEditorDialogComponent } from './components/product-editor-dialog/product-editor-dialog.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { ImageUploadItemComponent } from './components/image-upload-item/image-upload-item.component';
import { ProductCategorySelectComponent } from './components/product-category-select/product-category-select.component';

@NgModule({
  declarations: [
    AdminComponent, 
    AdminProductComponent,
    ProductEditorDialogComponent,
    ImageUploaderComponent,
    ImageUploadItemComponent,
    ProductCategorySelectComponent
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
  ],
  entryComponents: [
    ProductEditorDialogComponent
  ],
})
export class AdminModule { }
