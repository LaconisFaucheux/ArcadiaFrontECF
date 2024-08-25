import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewsManagementComponent } from './admin-reviews-management.component';

describe('AdminReviewsManagementComponent', () => {
  let component: AdminReviewsManagementComponent;
  let fixture: ComponentFixture<AdminReviewsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReviewsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReviewsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
