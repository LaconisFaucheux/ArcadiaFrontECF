import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZooManagementLandingPageComponent } from './admin-zoo-management-landing-page.component';

describe('AdminZooManagementLandingPageComponent', () => {
  let component: AdminZooManagementLandingPageComponent;
  let fixture: ComponentFixture<AdminZooManagementLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminZooManagementLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminZooManagementLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
