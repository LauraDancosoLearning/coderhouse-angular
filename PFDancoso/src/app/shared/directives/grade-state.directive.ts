import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { GradeStateEnum } from '../models/gradeStates.enum';

@Directive({
  selector: '[gradeState]',
})
export class GradeStateDirective implements AfterViewInit {
  @Input({required: true}) mark!: number | null | undefined;

  constructor(public eleRef: ElementRef) {}

  ngAfterViewInit(): void {
    let bgClass;
    let label;

    if ((this.mark ?? -1) >= GradeStateEnum.Pass) {
      bgClass = 'success';
      label = GradeStateEnum[GradeStateEnum.Pass];
    } else if ((this.mark ?? -1) >= GradeStateEnum.LowPass) {
      bgClass = 'warning';
      label = GradeStateEnum[GradeStateEnum.LowPass];
    } else if ((this.mark ?? -1) >= GradeStateEnum.Fail) {
      bgClass = 'danger';
      label = GradeStateEnum[GradeStateEnum.Fail];
    } else {
      bgClass = 'secondary';
      label = 'Absent';
    }

    this.eleRef.nativeElement.innerHTML += `<span class="badge bg-${bgClass} ${this.eleRef.nativeElement.innerHTML.length>0 ? 'ms-2' : ''}">${label.toUpperCase()}</span>`;
  }
}
