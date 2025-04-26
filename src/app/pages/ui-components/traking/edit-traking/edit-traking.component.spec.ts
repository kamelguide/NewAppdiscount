import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrakingComponent } from './edit-traking.component';

describe('EditTrakingComponent', () => {
  let component: EditTrakingComponent;
  let fixture: ComponentFixture<EditTrakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTrakingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
