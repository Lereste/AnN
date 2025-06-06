import { CommonModule, isPlatformBrowser, NgFor, NgOptimizedImage, NgStyle } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  afterNextRender,
  inject,
} from '@angular/core';

interface carouselImage {
  id: number;
  imageSrc: string;
  imageAlt: string;
  content: {
    title: string;
    description: string;
  };
}

@Component({
    selector: 'app-carousel',
    imports: [CommonModule, NgFor],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @Input() imagesDataInput: carouselImage[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  @Input() isAutoSlide = true;
  @Input() slideTimer: number = 6000; // default value
  setInterval: any;

  @ViewChild('autoplay') autoplay!: ElementRef<any>;
  @ViewChild('slider') slider!: ElementRef<any>;

  selectedIndex = 0;

  private sliderNativeElement: any;
  private readonly platformId = inject(PLATFORM_ID);

  constructor(private cdr: ChangeDetectorRef) {
    afterNextRender(() => {
      this.sliderNativeElement = this.slider.nativeElement;
      this.autoSlideImage(this.isAutoSlide);
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadEvent();
    }
  }

  ngAfterViewChecked() {
    // this.cdr.detectChanges();
  }

  loadEvent() {
    this.autoplay?.nativeElement.addEventListener('mouseover', () => {
      this.autoSlideImage((this.isAutoSlide = false));
    });
    this.autoplay?.nativeElement.addEventListener('mouseleave', () => {
      this.autoSlideImage((this.isAutoSlide = true));
    });
  }

  autoSlideImage(isAutoSlide: boolean): void {
    if (isAutoSlide) {
      this.setInterval = setInterval(() => {
        this.onNextClick();
      }, this.slideTimer);
    } else {
      clearInterval(this.setInterval);
    }
  }

  // sets index of image on dot/indicator click
  selectImage(index: number): void {
    if (!this.sliderNativeElement) return;

    this.selectedIndex = index;

    const childrenList = this.sliderNativeElement.children;
    const clickedItem = childrenList[index];

    // Di chuyển tất cả các phần tử sao cho phần tử index được đưa lên đầu
    for (let i = 0; i < index; i++) {
      this.sliderNativeElement.append(childrenList[0]);
    }

    this.cdr.markForCheck();
  }


  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.imagesDataInput.length - 1;
    } else {
      this.selectedIndex--;
    }

    if (this.sliderNativeElement) {
      const currentItem = this.sliderNativeElement.children[this.sliderNativeElement.children.length - 1];
      this.sliderNativeElement?.prepend(currentItem);
    }
  }

  onNextClick(): void {
    if (this.selectedIndex === this.imagesDataInput.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }

    if (this.sliderNativeElement) {
      const childrenList = this.sliderNativeElement.children;
      this.sliderNativeElement?.append(childrenList[0]);
    }
  }

  onMouseOver() {
    this.autoSlideImage((this.isAutoSlide = false));
  }

  onMouseLeave() {
    this.autoSlideImage((this.isAutoSlide = true));
  }
}
