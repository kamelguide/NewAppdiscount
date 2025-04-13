// coupon.component.ts
import { Component } from '@angular/core';
import { MainTableComponent } from "../main-table/main-table.component";

interface Coupon {
  id: number;
  couponCode: string;
  productReference: string;
  discountValue: number;
  status: string;
  idLink: number;
}

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [MainTableComponent],
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent {
  coupons: Coupon[] = [
    {
      id: 1,
      couponCode: 'SUMMER2023',
      productReference: 'REF-001',
      discountValue: 15.0,
      status: 'active',
      idLink: 101
    },
    {
      id: 2,
      couponCode: 'WINTERSALE',
      productReference: 'REF-002',
      discountValue: 20.0,
      status: 'expired',
      idLink: 102
    },
    {
      id: 3,
      couponCode: 'NEWUSER10',
      productReference: 'REF-003',
      discountValue: 10.0,
      status: 'active',
      idLink: 103
    }
  ];

  couponTableConfig = {
    title: 'Coupon Management',
    dataSource: this.coupons,
    showMenu: true,
    menuItems: [
      { icon: 'edit', label: 'Edit', action: (coupon: Coupon) => this.editCoupon(coupon) },
      { icon: 'delete', label: 'Delete', action: (coupon: Coupon) => this.deleteCoupon(coupon) },
      { icon: 'visibility', label: 'View', action: (coupon: Coupon) => this.viewCoupon(coupon) }
    ],
    columns: [
      {
        name: 'couponCode',
        header: 'Coupon Code',
        headerClass: 'font-bold',
        cell: (coupon: Coupon) => `
          <div class="f-s-14 f-w-600">${coupon.couponCode}</div>
          <div class="f-s-14 f-w-600">ID: ${coupon.id}</div>
        `
      },
      {
        name: 'productReference',
        header: 'Product Reference',
        cell: (coupon: Coupon) => coupon.productReference
      },
      {
        name: 'discountValue',
        header: 'Discount Value',
        cell: (coupon: Coupon) => `${coupon.discountValue}%`
      },
      {
        name: 'status',
        header: 'Status',
        cell: (coupon: Coupon) => {
          if (coupon.status === 'active') {
            return `<span class="bg-light-success text-success rounded f-w-600 p-6 p-y-4 f-s-12">Active</span>`;
          } else if (coupon.status === 'expired') {
            return `<span class="bg-light-error text-error rounded f-w-600 p-6 p-y-4 f-s-12">Expired</span>`;
          } else {
            return `<span class="bg-light-warning text-warning rounded f-w-600 p-6 p-y-4 f-s-12">${coupon.status}</span>`;
          }
        }
      },
      {
        name: 'idLink',
        header: 'Link ID',
        cell: (coupon: Coupon) => coupon.idLink.toString()
      }
    ]
  };

  editCoupon(coupon: Coupon) {
    console.log('Editing coupon:', coupon);
  }

  deleteCoupon(coupon: Coupon) {
    console.log('Deleting coupon:', coupon);
  }

  viewCoupon(coupon: Coupon) {
    console.log('Viewing coupon:', coupon);
  }
}
