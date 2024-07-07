import { CommonModule, NgFor, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
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
  standalone: true,
  imports: [CommonModule, NgFor, NgStyle],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @Input() imagesDataInput: carouselImage[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  @Input() isAutoSlide = true;
  @Input() slideTimer: number = 6000;
  setInterval: any;

  @ViewChild('autoplay') autoplay!: ElementRef<any>;
  @ViewChild('slider') slider!: ElementRef<any>;

  selectedIndex = 0;

  ngOnInit(): void {
    this.autoSlideImage(this.isAutoSlide);
  }

  ngAfterViewInit() {
    this.loadEvent();
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
    this.selectedIndex = index;

    // this.imagesDataInput.find((item:any, idx) => {

    //   if (this.selectedIndex === idx) {
    //     console.log('this.selectedIndex', this.selectedIndex);
    //     const ccc = this.slider.nativeElement.children[idx]; // lấy ảnh ở index 5 là The Migration
    //     console.log('ccc', ccc);
    //     this.slider.nativeElement?.append(ccc);
    //   }
    // })
  }

  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.imagesDataInput.length - 1;
    } else {
      this.selectedIndex--;
    }

    const currentItem =
      this.slider.nativeElement.children[
        this.slider.nativeElement.children.length - 1
      ];
    this.slider.nativeElement?.prepend(currentItem);
  }

  onNextClick(): void {
    if (this.selectedIndex === this.imagesDataInput.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }

    const childrenList = this.slider.nativeElement.children;
    this.slider.nativeElement?.append(childrenList[0]);
  }

  onMouseOver(){
      this.autoSlideImage((this.isAutoSlide = false));
  }

  onMouseLeave() {
    this.autoSlideImage((this.isAutoSlide = true));
  }
}
