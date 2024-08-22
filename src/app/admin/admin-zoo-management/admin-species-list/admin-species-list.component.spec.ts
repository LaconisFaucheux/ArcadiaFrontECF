import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpeciesListComponent } from './admin-species-list.component';

describe('AdminSpeciesListComponent', () => {
  let component: AdminSpeciesListComponent;
  let fixture: ComponentFixture<AdminSpeciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSpeciesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSpeciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
