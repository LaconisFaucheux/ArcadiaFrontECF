import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalFeedingFormComponent } from './animal-feeding-form.component';

describe('AnimalFeedingFormComponent', () => {
  let component: AnimalFeedingFormComponent;
  let fixture: ComponentFixture<AnimalFeedingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalFeedingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalFeedingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
