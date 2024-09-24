import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnimalFeedingComponent } from './admin-animal-feeding.component';

describe('AdminAnimalFeedingComponent', () => {
  let component: AdminAnimalFeedingComponent;
  let fixture: ComponentFixture<AdminAnimalFeedingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAnimalFeedingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnimalFeedingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
