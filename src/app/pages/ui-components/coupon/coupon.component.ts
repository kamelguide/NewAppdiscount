import { Component, OnInit } from '@angular/core';
import { MainTableComponent } from "../main-table/main-table.component";
import { GetCouponTracking } from "./coupon.data";
import { CouponService } from './coupon.service';  // Import your service

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [MainTableComponent],
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  coupons: GetCouponTracking[] = []; // Start with an empty array
  couponTableConfig = {
    title: 'Coupon Management',
    dataSource: this.coupons,
    showMenu: true,
    menuItems: [
      { icon: 'edit', label: 'Edit', action: (coupon: GetCouponTracking) => this.editCoupon(coupon) },
      { icon: 'delete', label: 'Delete', action: (coupon: GetCouponTracking) => this.deleteCoupon(coupon) },
      { icon: 'visibility', label: 'View', action: (coupon: GetCouponTracking) => this.viewCoupon(coupon) }
    ],
    columns: [
      {
        name: 'couponCode',
        header: 'Coupon Code',
        headerClass: 'font-bold',
        cell: (coupon: GetCouponTracking) => `
          <div class="f-s-14 f-w-600">${coupon.couponCode}</div>
          <div class="f-s-14 f-w-600">ID: ${coupon.id}</div>
        `
      },
      {
        name: 'productReference',
        header: 'Product Reference',
        cell: (coupon: GetCouponTracking) => coupon.productReference
      },
      {
        name: 'discountValue',
        header: 'Discount Value',
        cell: (coupon: GetCouponTracking) => `${coupon.discountValue}%`
      },
      {
        name: 'email',
        header: 'Email',
        cell: (coupon: GetCouponTracking) => `${coupon.email}`
      },
      {
        name: 'sentDate',
        header: 'Sent Date',
        cell: (coupon: GetCouponTracking) => `${coupon.sentDate}`
      },
      {
        name: 'status',
        header: 'Status',
        cell: (coupon: GetCouponTracking) => {
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
        cell: (coupon: GetCouponTracking) => coupon.idLink.toString()
      }
    ]
  };

  constructor(private couponService: CouponService) {}

  ngOnInit(): void {
    this.getCoupons();  // Fetch data when the component initializes
  }

  getCoupons(): void {
    this.couponService.getCoupons().subscribe(
      (data: GetCouponTracking[]) => {
        this.coupons = data;  // Assign the fetched data to the coupons array
        this.couponTableConfig.dataSource = this.coupons;  // Update the table with new data
      },
      error => {
        console.error('Error fetching coupons:', error);
      }
    );
  }

  editCoupon(coupon: GetCouponTracking) {
    console.log('Editing coupon:', coupon);
  }

  deleteCoupon(coupon: GetCouponTracking) {
    console.log('Deleting coupon:', coupon);
  }

  viewCoupon(coupon: GetCouponTracking) {
    console.log('Viewing coupon:', coupon);
  }
}
