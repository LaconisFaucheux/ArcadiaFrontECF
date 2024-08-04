import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHabitatsFormComponent } from './admin-habitats-form.component';

describe('AdminHabitatsFormComponent', () => {
  let component: AdminHabitatsFormComponent;
  let fixture: ComponentFixture<AdminHabitatsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHabitatsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHabitatsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
