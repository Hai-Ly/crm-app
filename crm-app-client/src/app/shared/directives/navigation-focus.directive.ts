import { Directive, ElementRef, HostBinding } from '@angular/core';

/** The timeout id of the previous focus change. */
let lastTimeoutId = -1;

@Directive({
  selector: '[hgFocusOnNavigation]'
})
export class NavigationFocusDirective {
  @HostBinding('style.tabindex') tabindex: string;

  constructor(private el: ElementRef) {
    this.tabindex = '-1';
    clearTimeout(lastTimeoutId);
    // 100ms timeout is used to allow the page to settle before moving focus for screen readers.
    lastTimeoutId = window.setTimeout(() => this.el.nativeElement.focus({preventScroll: true}), 100);
  }
}
