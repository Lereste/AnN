import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Products } from 'src/app/core/models/product/product.model';

export enum ACCESSORIES_TYPE {
  GUITAR = 'GUITAR',
  PIANO = 'PIANO',
  ORGAN = 'ORGAN',
}

@Component({
  selector: 'app-accessories-type',
  standalone: true,
  imports: [ProductItemComponent, NgIf, NgSwitch, NgSwitchDefault, NgSwitchCase],
  templateUrl: './accessories-type.component.html',
  styleUrl: './accessories-type.component.scss'
})

export class AccessoriesTypeComponent {
  ACCESSORIES_TYPE = ACCESSORIES_TYPE;
  selectedAccessories: string = ACCESSORIES_TYPE.GUITAR;

  guitarAccessories: Products[] = [];
  pianoAccessories: Products[] = [];
  organAccessories: Products[] = [];
  
  constructor() {
    this.guitarAccessories = [
      {
        id: 1,
        imageSrc: 'assets/image/accessories/guitar/Móng Gảy Đàn Guitar Alice – Guitar Picks.jpg',
        imageAlt: 'Móng Gảy Đàn Guitar Alice – Guitar Picks',
        productName: 'Móng Gảy Đàn Guitar Alice – Guitar Picks',
        productDefaultPrice: 5000
      },
      {
        id: 2,
        imageSrc: 'assets/image/accessories/guitar/Móng đeo ngón cái guitar Alice AP-N-100.jpg',
        imageAlt: 'Móng đeo ngón cái guitar Alice AP-N-100',
        productName: 'Móng đeo ngón cái guitar Alice AP-N-100',
        productDefaultPrice: 20000
      },
      {
        id: 3,
        imageSrc: 'assets/image/accessories/guitar/Dụng cụ tập tay luyện ngón chơi Guitar Aroma AHF-03BK.jpg',
        imageAlt: 'Dụng cụ tập tay luyện ngón chơi Guitar Aroma AHF-03BK',
        productName: 'Dụng cụ tập tay luyện ngón chơi Guitar Aroma AHF-03BK',
        productDefaultPrice: 150000
      },
      {
        id: 4,
        imageSrc: 'assets/image/accessories/guitar/Máy Lên Dây Đàn Cherub WST 905.jpg',
        imageAlt: 'Máy Lên Dây Đàn Cherub WST 905',
        productName: 'Máy Lên Dây Đàn Cherub WST 905',
        productDefaultPrice: 300000
      },
      {
        id: 5,
        imageSrc: 'assets/image/accessories/guitar/Bao Da Đàn Guitar Classic 5 Lớp BCB550 BK.jpg',
        imageAlt: 'Bao Da Đàn Guitar Classic 5 Lớp BCB550 BK',
        productName: 'Bao Da Đàn Guitar Classic 5 Lớp BCB550 BK',
        productDefaultPrice: 550000
      },
      {
        id: 6,
        imageSrc: 'assets/image/accessories/guitar/EQ Fishman OEM-ISY-201.jpg',
        imageAlt: 'EQ Fishman OEM-ISY-201',
        productName: 'EQ Fishman OEM-ISY-201',
        productDefaultPrice: 1000000
      }
    ]

    this.pianoAccessories = [
      {
        id: 1,
        imageSrc: 'assets/image/accessories/piano/Thủy lực Piano – Piano Slow Fall Device A-14B.jpg',
        imageAlt: 'Thủy lực Piano – Piano Slow Fall Device A-14B',
        productName: 'Thủy lực Piano – Piano Slow Fall Device A-14B',
        productDefaultPrice: 500000
      },
      {
        id: 2,
        imageSrc: 'assets/image/accessories/piano/Miếng Dán Nốt Bàn Phím Piano, Organ, Melodion, Pianica 88, 61, 49, 37, 32 phím.jpg',
        imageAlt: 'Miếng Dán Nốt Bàn Phím Piano, Organ, Melodion, Pianica 88, 61, 49, 37, 32 phím',
        productName: 'Miếng Dán Nốt Bàn Phím Piano, Organ, Melodion, Pianica 88, 61, 49, 37, 32 phím',
        productDefaultPrice: 39000
      },
      {
        id: 3,
        imageSrc: 'assets/image/accessories/piano/Máy đập nhịp điện tử Yamaha ME-55BK.jpg',
        imageAlt: 'Máy đập nhịp điện tử Yamaha ME-55BK',
        productName: 'Máy đập nhịp điện tử Yamaha ME-55BK',
        productDefaultPrice: 950000
      },
      {
        id: 4,
        imageSrc: 'assets/image/accessories/piano/Ghế xoay piano có tăng đơ GXP1200 (W).jpg',
        imageAlt: 'Ghế xoay piano có tăng đơ GXP1200 (W)',
        productName: 'Ghế xoay piano có tăng đơ GXP1200 (W)',
        productDefaultPrice: 1500000
      },
      {
        id: 5,
        imageSrc: 'assets/image/accessories/piano/Pedal Yamaha LP-5A.jpg',
        imageAlt: 'Pedal Yamaha LP-5A',
        productName: 'Pedal Yamaha LP-5A',
        productDefaultPrice: 900000
      },
      {
        id: 6,
        imageSrc: 'assets/image/accessories/piano/Máy đập nhịp cơ Seiko SPM400 (Đen).jpg',
        imageAlt: 'Máy đập nhịp cơ Seiko SPM400 (Đen)',
        productName: 'Máy đập nhịp cơ Seiko SPM400 (Đen)',
        productDefaultPrice: 1200000
      }
    ]

    this.organAccessories = [
      {
        id: 1,
        imageSrc: 'assets/image/accessories/organ/Pedal Tạo tiếng Vang Cho Đàn Organ KP2.jpg',
        imageAlt: 'Pedal Tạo tiếng Vang Cho Đàn Organ KP2',
        productName: 'Pedal Tạo tiếng Vang Cho Đàn Organ KP2',
        productDefaultPrice: 170000
      },
      {
        id: 2,
        imageSrc: 'assets/image/accessories/organ/Bao Đàn Organ 1 Lớp.jpg',
        imageAlt: 'Bao Đàn Organ 1 Lớp',
        productName: 'Bao Đàn Organ 1 Lớp',
        productDefaultPrice: 150000
      },
      {
        id: 3,
        imageSrc: 'assets/image/accessories/organ/Bao Đàn Yamaha SC-CP88.jpg',
        imageAlt: 'Bao Đàn Yamaha SC-CP88',
        productName: 'Bao Đàn Yamaha SC-CP88',
        productDefaultPrice: 7090000
      },
      {
        id: 4,
        imageSrc: 'assets/image/accessories/organ/Chân Đàn Organ 2 Tầng KS-86.jpg',
        imageAlt: 'Chân Đàn Organ 2 Tầng KS-86',
        productName: 'Chân Đàn Organ 2 Tầng KS-86',
        productDefaultPrice: 2500000
      },
      {
        id: 5,
        imageSrc: 'assets/image/accessories/organ/Nguồn Đàn Organ Prostar AD-5 Cam (nguồn casio).jpg',
        imageAlt: 'Nguồn Đàn Organ Prostar AD-5 Cam (nguồn casio)',
        productName: 'Nguồn Đàn Organ Prostar AD-5 Cam (nguồn casio)',
        productDefaultPrice: 250000
      },
      {
        id: 6,
        imageSrc: 'assets/image/accessories/organ/CHÂN ĐÀN ORGAN X QUIK LOCK T-20BK.jpg',
        imageAlt: 'CHÂN ĐÀN ORGAN X QUIK LOCK T-20BK',
        productName: 'CHÂN ĐÀN ORGAN X QUIK LOCK T-20BK',
        productDefaultPrice: 770000
      }
    ]
  }

  toggleGuitarAccessories(): void {
    this.selectedAccessories = ACCESSORIES_TYPE.GUITAR
  }


  togglePianoAccessories(): void {
    this.selectedAccessories = ACCESSORIES_TYPE.PIANO;
  }
 
  toggleOrganAccessories(): void {
    this.selectedAccessories = ACCESSORIES_TYPE.ORGAN
  }
}
