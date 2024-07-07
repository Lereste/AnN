import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  selector: 'app-latest-products',
  standalone: true,
  imports: [CommonModule, NgFor, NgStyle],
  templateUrl: './latest-products.component.html',
  styleUrl: './latest-products.component.scss'
})
export class LatestProductsComponent implements OnInit{
  images: carouselImage[] = [];

  selectedIndex = 0;
  @ViewChild('slider') slider!: ElementRef<any>;
  @ViewChild('controlAutoPlay') controlAutoPlay!: ElementRef<any>;
  slideTimer: number = 3000;
  setInterval: any;
  isAutoSlide = true;

  constructor() {
    this.images = [
      {
        id: 1,
        imageSrc:
          'https://product.hstatic.net/200000722513/product/hs35_v2_artboard01_aa_80b3106cd5654c1e89d113d784994e3c.jpg',
        imageAlt: 'Tai nghe Corsair HS35 V2 Carbon',
        content: {
          title: 'Tai nghe Corsair HS35 V2 Carbon',
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        },
      },
      {
        id: 2,
        imageSrc:
          'https://product.hstatic.net/200000722513/product/obdp1pwt_33d3bbb08fe043aeafec7408dfff5abc.png',
        imageAlt: 'Tai nghe Logitech Không dây Zone Vibe 100 Hồng',
        content: {
          title: 'Tai nghe Logitech Không dây Zone Vibe 100 Hồng',
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        },
      },
      {
        id: 3,
        imageSrc:
          'https://product.hstatic.net/200000722513/product/tai-nghe-e-dra-eh410-pro-1_4b258b7897e34366b9b5b4b3ac49d4ab_8327864f95954272b641ee65ea66194f.jpg',
        imageAlt: 'Tai nghe E-Dra EH412 Pro RGB USB 7.1',
        content: {
          title: 'Tai nghe E-Dra EH412 Pro RGB USB 7.1',
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        },
      },
      {
        id: 4,
        imageSrc:
          'https://product.hstatic.net/200000722513/product/ch-g733-lightspeed-wireless-black-666_2eb1a71d562e4a6d853a0f086723cbe3_f7f15fa3c25c4d6190c05c6db168fbf7.png',
        imageAlt: 'Tai nghe Logitech G733 LIGHTSPEED Wireless Black',
        content: {
          title: 'Tai nghe Logitech G733 LIGHTSPEED Wireless Black',
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        },
      },
      {
        id: 5,
        imageSrc:
          'https://product.hstatic.net/200000722513/product/gearvn-tai-nghe-hp-hyperx-cloud-iii-wireless-red-1_b529095e42444b128058cb0da4703266.png',
        imageAlt: 'Tai nghe HP HyperX Cloud III Wireless Red',
        content: {
          title: 'Tai nghe HP HyperX Cloud III Wireless Red',
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        },
      },
      {
        id: 6,
        imageSrc:
          'https://product.hstatic.net/200000722513/product/-tai-nghe-steelseries-arctis-nova-3-1_9815cec074e24304993ab174e6d380ef_b73fc3f7d93948d78c62d38c8ac8ad57.png',
        imageAlt: 'Tai nghe Steelseries Arctis Nova 3',
        content: {
          title: 'Tai nghe Steelseries Arctis Nova 3',
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
        },
      },
    ];
  }

  ngOnInit(): void {
    this.autoSlideImage(this.isAutoSlide);
  }

  ngAfterViewInit() {
    this.loadEvent();
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

  loadEvent() {
    this.controlAutoPlay?.nativeElement.addEventListener('mouseover', () => {
      this.autoSlideImage((this.isAutoSlide = false));
    });
    this.controlAutoPlay?.nativeElement.addEventListener('mouseleave', () => {
      this.autoSlideImage((this.isAutoSlide = true));
    });
  }

  onPrevClick() {
    this.slider.nativeElement.prepend(this.slider.nativeElement.children[this.slider.nativeElement.children.length - 1])
  }

  onNextClick() {
    this.slider.nativeElement.append(this.slider.nativeElement.children[0])
  }
}
