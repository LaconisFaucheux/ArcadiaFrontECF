import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeesFormComponent } from './admin-employees-form.component';

describe('AdminEmployeesFormComponent', () => {
  let component: AdminEmployeesFormComponent;
  let fixture: ComponentFixture<AdminEmployeesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEmployeesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEmployeesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
