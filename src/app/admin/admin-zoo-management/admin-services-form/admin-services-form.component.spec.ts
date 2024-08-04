import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesFormComponent } from './admin-services-form.component';

describe('AdminServicesFormComponent', () => {
  let component: AdminServicesFormComponent;
  let fixture: ComponentFixture<AdminServicesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminServicesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminServicesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
