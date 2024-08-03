import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

interface categoryDataModel {
  parentName: string;
  icon: string;
  childCategory: childCategory[];
}

interface childCategory {
  brandName?: string;
}

@Component({
  selector: 'app-category-hero',
  standalone: true,
  imports: [NgFor],
  templateUrl: './category-hero.component.html',
  styleUrl: './category-hero.component.scss'
})
export class CategoryHeroComponent {
  categoryData: categoryDataModel[] = [];

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
}