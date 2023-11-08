import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollStudentModalComponent } from './enroll-student-modal.component';

describe('EnrollStudentModalComponent', () => {
  let component: EnrollStudentModalComponent;
  let fixture: ComponentFixture<EnrollStudentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollStudentModalComponent]
    });
    fixture = TestBed.createComponent(EnrollStudentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
