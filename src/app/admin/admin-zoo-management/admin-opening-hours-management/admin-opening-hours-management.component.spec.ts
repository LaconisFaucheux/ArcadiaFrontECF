import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOpeningHoursManagementComponent } from './admin-opening-hours-management.component';

describe('AdminOpeningHoursManagementComponent', () => {
  let component: AdminOpeningHoursManagementComponent;
  let fixture: ComponentFixture<AdminOpeningHoursManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOpeningHoursManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOpeningHoursManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
