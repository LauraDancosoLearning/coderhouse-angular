import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[headingTitle]'
})
export class HeadingTitleDirective implements OnChanges{

  @Input() fontSizePx: number = 20;
  
  constructor(private eleRef: ElementRef, private render: Renderer2) { 
    this.setFontSize(this.fontSizePx)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['fontSizePx']){
      this.setFontSize(changes['fontSizePx'].currentValue);
    }
  }

  setFontSize(fontSize: number){
    this.render.setStyle(this.eleRef.nativeElement, 'font-size',  `${fontSize}px`)
  }
}
