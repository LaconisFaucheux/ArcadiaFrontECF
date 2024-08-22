import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpeciesFormComponent } from './admin-species-form.component';

describe('AdminSpeciesFormComponent', () => {
  let component: AdminSpeciesFormComponent;
  let fixture: ComponentFixture<AdminSpeciesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSpeciesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSpeciesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
