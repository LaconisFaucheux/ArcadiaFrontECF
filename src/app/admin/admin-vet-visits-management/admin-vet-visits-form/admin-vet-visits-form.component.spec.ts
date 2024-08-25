import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVetVisitsFormComponent } from './admin-vet-visits-form.component';

describe('AdminVetVisitsFormComponent', () => {
  let component: AdminVetVisitsFormComponent;
  let fixture: ComponentFixture<AdminVetVisitsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVetVisitsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVetVisitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
