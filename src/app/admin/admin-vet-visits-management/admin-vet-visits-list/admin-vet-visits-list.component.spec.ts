import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVetVisitsListComponent } from './admin-vet-visits-list.component';

describe('AdminVetVisitsListComponent', () => {
  let component: AdminVetVisitsListComponent;
  let fixture: ComponentFixture<AdminVetVisitsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVetVisitsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVetVisitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
