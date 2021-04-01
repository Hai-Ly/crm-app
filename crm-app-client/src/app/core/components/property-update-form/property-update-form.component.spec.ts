import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUpdateFormComponent } from './property-update-form.component';

describe('PropertyUpdateFormComponent', () => {
  let component: PropertyUpdateFormComponent;
  let fixture: ComponentFixture<PropertyUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
