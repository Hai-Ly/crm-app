import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageViewerComponent } from './product-image-viewer.component';

describe('ProductImageViewerComponent', () => {
  let component: ProductImageViewerComponent;
  let fixture: ComponentFixture<ProductImageViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImageViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
