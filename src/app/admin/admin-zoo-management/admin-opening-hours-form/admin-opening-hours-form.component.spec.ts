import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOpeningHoursFormComponent } from './admin-opening-hours-form.component';

describe('AdminOpeningHoursFormComponent', () => {
  let component: AdminOpeningHoursFormComponent;
  let fixture: ComponentFixture<AdminOpeningHoursFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOpeningHoursFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOpeningHoursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
