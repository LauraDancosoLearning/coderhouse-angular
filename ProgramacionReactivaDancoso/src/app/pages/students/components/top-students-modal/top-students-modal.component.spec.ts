import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStudentsModalComponent } from './top-students-modal.component';

describe('TopStudentsModalComponent', () => {
  let component: TopStudentsModalComponent;
  let fixture: ComponentFixture<TopStudentsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopStudentsModalComponent]
    });
    fixture = TestBed.createComponent(TopStudentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
