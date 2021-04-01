import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorMode, Product, ProductService, UploadStatus, Image } from 'src/app/core';
import { CoreService } from 'src/app/core/services/core.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'crm-product-editor-dialog',
  templateUrl: './product-editor-dialog.component.html',
  styleUrls: ['./product-editor-dialog.component.scss']
})
export class ProductEditorDialogComponent implements OnInit {

  productForm: FormGroup;
  id: string;
  subscriptions: Subscription[];
  mode: EditorMode;
  images: UploadStatus<Image>[] = [];
  imgUploadCompleted = false;

  get isCreateMode(): boolean {
    return this.mode === EditorMode.Create;
  }

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ProductEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: EditorMode, product: Product}, private productService: ProductService, private coreService: CoreService) {
      this.mode = data.mode;
      let p:Product = data.product || {
            id:"",
            name:"",
            price:0,
            description:"",
            thumbnail:"",
            images:[]
          }
      
      this.id = p.id;

      let features:FormControl[] = [];
      p.features?.forEach(f => features.push(this.fb.control(f)))

      let details:any[] = [];
      p.details?.forEach(d => details.push(this.fb.group(d)));

      this.productForm = this.fb.group({
        name: [p.name, Validators.required],
        price: [p.description, Validators.required],
        description: [p.description, Validators.required],
        features: this.fb.array([
          ...features,
          this.fb.control('')
        ]),
        details: this.fb.array([
          ...details,
          this.fb.group({name:'',value:''})
        ]),

        // category:  [p.category, Validators.required],
      });

      p.images.forEach(img => {
        this.images.push({ok:true, progress:100, done:true, respone:img})
      });


      this.subscriptions = [];
    }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    while (this.subscriptions.length > 0) {
      this.subscriptions.pop()!.unsubscribe();
    }
  }

  get f() { return this.productForm.controls; }

  get name() { return this.productForm.get('name'); }

  get price() { return this.productForm.get('price'); }

  get features() { return this.productForm.get('features') as FormArray; }

  get details() { return this.productForm.get('details') as FormArray; }

  get description() { return this.productForm.get('description'); }


  deleteFeature(index: number) {
    this.features.removeAt(index);
  }

  addFeature(index: number) {
    this.features.insert(index + 1, this.fb.control(''));
  }

  deleteDetail(index: number) {
    this.details.removeAt(index);
  }

  addDetail(index: number) {
    this.details.insert(index + 1, this.fb.control(''));
  }

  onCancelClick() {
    console.log(this.productForm.value);
    this.dialogRef.close();
  }

  onOkClicked() {

    // remove duplicate file

    let obs: Observable<Product>;
   
    console.log(this.productForm.value);
    if (this.mode === EditorMode.Create) {
      obs = this.productService.createProduct(this.productForm.value);
    } else {
      obs = this.productService.updateProduct(this.id, this.productForm.value);
    }

    obs.subscribe (
      product =>  {
        console.log(product);
        this.dialogRef.close({ mode : this.mode, product});
      },
      err => console.error(err)
    );
  }

  onImageUploadEvent(e: string) {
    console.log('onImageUploadEvent: ' + e);
    if (e === "completed") {
      this.imgUploadCompleted = true;
    } else if (e === "uploading") {
      this.imgUploadCompleted = false;
    } else if (e === "limiterror") {
      //TODO: show limit error
    }
  }
}
