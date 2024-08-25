import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVetVisitsManagementComponent } from './admin-vet-visits-management.component';

describe('AdminVetVisitsManagementComponent', () => {
  let component: AdminVetVisitsManagementComponent;
  let fixture: ComponentFixture<AdminVetVisitsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVetVisitsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVetVisitsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
