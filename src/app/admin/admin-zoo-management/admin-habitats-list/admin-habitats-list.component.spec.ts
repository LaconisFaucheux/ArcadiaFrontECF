import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHabitatsListComponent } from './admin-habitats-list.component';

describe('AdminHabitatsListComponent', () => {
  let component: AdminHabitatsListComponent;
  let fixture: ComponentFixture<AdminHabitatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHabitatsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHabitatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
