import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Inject,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-go-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './go-to-top.component.html',
  styleUrl: './go-to-top.component.scss',
})
export class GoToTopComponent {
  showScroll: boolean = false;
  showScrollHeight = 100;
  hideScrollHeight = 100;

  constructor() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) > this.showScrollHeight
    ) {
      this.showScroll = true;
    } else if (
      this.showScroll &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showScroll = false;
    }
  }

  scrollToTop() {
    const currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.scrollTo(0, currentScroll - currentScroll / 1);
    }
  }
}
