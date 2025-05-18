import { NgFor, NgClass, NgIf } from '@angular/common';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FooterComponent } from '../../layout/footer/footer.component';
// import 'animate.css'

interface categoryDataModel {
  parentName: string;
  icon?: string;
  childCategory: childCategory[];
}

interface childCategory {
  brandName?: string;
}


@Component({
    selector: 'app-category-mobile',
    imports: [NgFor, NgClass, NgIf,],
    templateUrl: './category-mobile.component.html',
    styleUrl: './category-mobile.component.scss'
})
export class CategoryMobileComponent {
  // @Input() categoryDataInput: categoryDataModel[] = [];
  @ViewChild('parentCategory') parentCategory!: ElementRef<any>;
  @ViewChild('childCategory') childCategory!: ElementRef<any>;

  categoryData: categoryDataModel[] = [];

 

  isActived: any;
  selectedParent: any;
  selectedChild: any;

  constructor() {
    this.categoryData = [
      {
        parentName: 'Đàn Piano',
        icon: 'piano',
        childCategory: [
          {
            brandName: 'Đàn Piano Điện',
          },
          {
            brandName: 'Đàn Piano Cơ',
          },
          {
            brandName: 'Đàn Piano Cuộn',
          },
          {
            brandName: 'Đàn Piano Cũ',
          },
        ],
      },
      {
        parentName: 'Đàn Organ',
        icon: 'organ',
        childCategory: [
          {
            brandName: 'Đàn Organ Korg',
          },
          {
            brandName: 'Đàn Organ Yamaha',
          },
          {
            brandName: 'Đàn Organ Casio',
          },
          {
            brandName: 'Đàn Organ Roland',
          },
          {
            brandName: 'Đàn Organ Kurtzman',
          },
        ],
      },
      {
        parentName: 'Đàn Guitar',
        icon: 'guitar',
        childCategory: [
          {
            brandName: 'Đàn Guitar Cổ Nhạc',
          },
          {
            brandName: 'Đàn Guitar Yamaha',
          },
          {
            brandName: 'Đàn Guitar Ba Đờn',
          },
          {
            brandName: 'Đàn Guitar Martin',
          },
          {
            brandName: 'Đàn Guitar Talor',
          },
          {
            brandName: 'Đàn Guitar Cordoba',
          },
          {
            brandName: 'Đàn Guitar Martinez',
          },
          {
            brandName: 'Đàn Guitar Ibanez',
          },
          {
            brandName: 'Đàn Guitar Fender',
          },
          {
            brandName: 'Đàn Guitar Epiphone',
          },
          {
            brandName: 'Đàn Guitar Diana',
          },
          {
            brandName: 'Đàn Guitar Famosa',
          },
          {
            brandName: 'Đàn Guitar Rosen',
          },
        ],
      },
      {
        parentName: 'Đàn Ukulele',
        icon: 'ukulele',
        childCategory: [
          {
            brandName: 'Đàn Ukulele Tenor',
          },
          {
            brandName: 'Đàn Ukulele Concert',
          },
          {
            brandName: 'Đàn Ukulele Soprano',
          },
          {
            brandName: 'Đàn Ukulele Bariton',
          },
          {
            brandName: 'Đàn Ukulele Các Loại',
          },
        ],
      },
      {
        parentName: 'Đàn Kalimba',
        icon: 'kalimba',
        childCategory: [
          {
            brandName: 'Đàn Kalimba Treelf',
          },
          {
            brandName: 'Đàn Kalimba Hluru',
          },
          {
            brandName: 'Đàn Kalimba Kimi',
          },
          {
            brandName: 'Đàn Kalimba Gecko',
          },
          {
            brandName: 'Đàn Kalimba Yael',
          },
          {
            brandName: 'Đàn Kalimba Ling Ting',
          },
          {
            brandName: 'Đàn Kalimba Walter',
          },
        ],
      },
      {
        parentName: 'Bộ Trống - Drum',
        icon: 'drum',
        childCategory: [
          {
            brandName: 'Bộ Gõ',
          },
          {
            brandName: 'Trống Không Linh',
          },
          {
            brandName: 'Trống Jazz',
          },
          {
            brandName: 'Trống Điện Tử',
          },
          {
            brandName: 'Trống Cajon',
          },
          {
            brandName: 'Trống Conga - Bongo',
          },
        ],
      },
      {
        parentName: 'Đàn Violin',
        icon: 'violin',
        childCategory: [
          {
            brandName: 'Đàn Violin Cổ Điển',
          },
          {
            brandName: 'Đàn Violin Baroque',
          },
          {
            brandName: 'Đàn Violin Điện',
          },
          {
            brandName: 'Đàn Violin Stroh',
          },
        ],
      },
    ];
  }

  onSelectedParent(parentName: any) {
    this.selectedParent = this.selectedParent === parentName ? null : parentName;
  }

  onSelectedChildren(item: any) {
    this.selectedChild = this.selectedChild === item ? null : item;
  }

  isActive(name: any) {
    return this.selectedParent === name;
  }
}
