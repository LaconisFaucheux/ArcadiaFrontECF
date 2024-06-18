import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitatsDetailComponent } from './habitats-detail.component';

describe('HabitatsDetailComponent', () => {
  let component: HabitatsDetailComponent;
  let fixture: ComponentFixture<HabitatsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitatsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitatsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
