import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZooManagementComponent } from './admin-zoo-management.component';

describe('AdminZooManagementComponent', () => {
  let component: AdminZooManagementComponent;
  let fixture: ComponentFixture<AdminZooManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminZooManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminZooManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
