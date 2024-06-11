import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

interface categoryDataModel {
  parentCategory?: string;
  childCategory?: string[];
}

@Component({
  selector: 'app-category-hero',
  standalone: true,
  imports: [NgFor],
  templateUrl: './category-hero.component.html',
  styleUrl: './category-hero.component.scss'
})
export class CategoryHeroComponent {
  @Input() categoryDataInput: categoryDataModel[] = [];

  constructor() {
    console.log('categoryDataInput', this.categoryDataInput);
  }
}
