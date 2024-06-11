import { CommonModule } from "@angular/common";
import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from "@angular/core";

interface carouselImage {
    imageSrc: string;
    imageAlt: string;
}

@Component({
    selector: "app-carousel",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./carousel.component.html",
    styleUrl: "./carousel.component.scss",
})
export class CarouselComponent implements OnInit, AfterViewInit {
    @Input() images: carouselImage[] = [];
    @Input() indicators = true;
    @Input() controls = true;
    @Input() isAutoSlide = true;
    @Input() slideTimer: number = 5000;
    setInterval: any;

    @ViewChild("autoplay") autoplay!: ElementRef<any>;

    selectedIndex = 0;

    ngOnInit(): void {
        this.autoSlideImage(this.isAutoSlide);
    }

    ngAfterViewInit() {
        this.autoplay.nativeElement.addEventListener("mouseover", () => {
            this.autoSlideImage(this.isAutoSlide = false);
        });

        this.autoplay.nativeElement.addEventListener("mouseleave", () => {
          this.autoSlideImage(this.isAutoSlide = true);
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
    }

    onPrevClick(): void {
        if (this.selectedIndex === 0) {
            this.selectedIndex = this.images.length - 1;
        } else {
            this.selectedIndex--;
        }
    }

    onNextClick(): void {
        if (this.selectedIndex === this.images.length - 1) {
            this.selectedIndex = 0;
        } else {
            this.selectedIndex++;
        }
    }
}
