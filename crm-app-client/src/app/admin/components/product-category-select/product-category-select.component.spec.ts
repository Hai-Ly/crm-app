import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategorySelectComponent } from './product-category-select.component';

describe('ProductCategorySelectComponent', () => {
  let component: ProductCategorySelectComponent;
  let fixture: ComponentFixture<ProductCategorySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategorySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
