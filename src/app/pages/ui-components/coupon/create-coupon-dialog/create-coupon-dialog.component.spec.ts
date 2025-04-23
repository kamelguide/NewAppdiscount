import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCouponDialogComponent } from './create-coupon-dialog.component';

describe('CreateCouponDialogComponent', () => {
  let component: CreateCouponDialogComponent;
  let fixture: ComponentFixture<CreateCouponDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCouponDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCouponDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
