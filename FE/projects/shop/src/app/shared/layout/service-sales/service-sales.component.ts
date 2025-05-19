import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-service-sales',
    imports: [NgFor],
    templateUrl: './service-sales.component.html',
    styleUrl: './service-sales.component.scss'
})
export class ServiceSalesComponent {
  repairService = [
    { title: 'Sửa chữa - vệ sinh máy lạnh', imageSrc: 'assets/image/facility/sua-may-lanh.png' },
    { title: 'Tháo - lắp máy lạnh', imageSrc: 'assets/image/facility/thao-lap-may-lanh.jpg' },
    { title: 'Sửa chữa - vệ sinh máy giặt', imageSrc: 'assets/image/facility/sua-may-giat.png' },
    { title: 'Sửa chữa máy nước nóng', imageSrc: 'assets/image/facility/sua-may-nuoc-nong.png' },
    { title: 'Sửa chữa - vệ sinh tủ lạnh', imageSrc: 'assets/image/facility/sua-tu-lanh.png' },
    { title: 'Sửa chữa lò vi sóng', imageSrc: 'assets/image/facility/sua-lo-vi-song.jpg' },
  ];
}
