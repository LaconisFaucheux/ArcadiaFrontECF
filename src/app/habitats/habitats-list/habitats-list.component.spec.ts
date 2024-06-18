import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitatsListComponent } from './habitats-list.component';

describe('HabitatsListComponent', () => {
  let component: HabitatsListComponent;
  let fixture: ComponentFixture<HabitatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitatsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
