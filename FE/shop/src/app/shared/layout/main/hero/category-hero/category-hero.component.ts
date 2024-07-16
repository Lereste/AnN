import { NgFor, NgClass, NgIf } from '@angular/common';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';

interface categoryDataModel {
  parentName: string;
  icon: string;
  childCategory: childCategory[];
}

interface childCategory {
  brandName?: string;
  name?: string;
}


@Component({
  selector: 'app-category-hero',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './category-hero.component.html',
  styleUrl: './category-hero.component.scss',
})
export class CategoryHeroComponent {
  @Input() categoryDataInput: categoryDataModel[] = [];
  @ViewChild('parentCategory') parentCategory!: ElementRef<any>;
  @ViewChild('childCategory') childCategory!: ElementRef<any>;

  isActived: any;
  selectedParent: any;
  selectedChild: any;

  constructor() {

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
