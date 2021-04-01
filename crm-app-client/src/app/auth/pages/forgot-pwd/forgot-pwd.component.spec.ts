import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPwdComponent } from './forgot-pwd.component';

describe('ForgotPwdComponent', () => {
  let component: ForgotPwdComponent;
  let fixture: ComponentFixture<ForgotPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
