import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnimalsFormComponent } from './admin-animals-form.component';

describe('AdminAnimalsFormComponent', () => {
  let component: AdminAnimalsFormComponent;
  let fixture: ComponentFixture<AdminAnimalsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAnimalsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnimalsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
