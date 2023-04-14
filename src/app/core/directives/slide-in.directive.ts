import { Directive, HostBinding, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appSlideIn]'
})
export class SlideInDirective implements OnInit {

  @HostBinding('attr.data-animate') private dataAnimate = true;
  @HostBinding('class.animate') private animate = false;

  @Input() delay: number = 0;

  constructor() {}

  ngOnInit(): void { 
    setTimeout(()=> {
      this.animate = true
    }, this.delay)
  }
}
