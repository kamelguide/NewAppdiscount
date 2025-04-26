import { Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import { MainTableComponent } from "../main-table/main-table.component";
import { GetCouponTracking } from "./coupon.data";
import { CouponService } from './coupon.service';
import { CreateCouponDialogComponent } from "./create-coupon-dialog/create-coupon-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {EditCouponDialogComponent} from "./edit-coupon-dialog/edit-coupon-dialog.component";

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [MainTableComponent, MatButton,MatSelectModule,  FormsModule,MatOptionModule,MatSelect,MatOptionModule,
    FormsModule],
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit  {
  coupons: GetCouponTracking[] = []; // Start with an empty array
  editingCouponId: number | null = null;
  private preventClose = false;

  editedStatus: string = '';

  couponTableConfig = {
    title: 'Coupon Management',
    dataSource: this.coupons,
    showMenu: true,
    menuItems: [
      { icon: 'edit', label: 'Edit', action: (coupon: GetCouponTracking) => this.startEditing(coupon) },
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
        cell: (coupon: GetCouponTracking) => `${coupon.status}`


      },

      {
        name: 'idLink',
        header: 'Link ID',
        cell: (coupon: GetCouponTracking) => coupon.idLink.toString()
      }
    ]
  };

  constructor(private couponService: CouponService, private dialog: MatDialog   , private el: ElementRef,
  private renderer: Renderer2) {}




  ngOnInit(): void {
    this.getCoupons();  // Fetch data when the component initializes
  }

  getCoupons(): void {
    this.couponService.getCoupons().subscribe(
      (data: GetCouponTracking[]) => {
        this.coupons = data;
        this.couponTableConfig.dataSource = [...this.coupons];
      },
      error => {
        console.error('Error fetching coupons:', error);
      }
    );
  }



  onStatusChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.editedStatus = select.value;
  }




  deleteCoupon(coupon: GetCouponTracking) {
    console.log('Deleting coupon:', coupon);
  }

  viewCoupon(coupon: GetCouponTracking) {
    console.log('Viewing coupon:', coupon);
  }

  openCouponDialog() {
    this.dialog.open(CreateCouponDialogComponent, {
      width: '500px'
    });
  }



  // ngAfterViewInit(): void {
  //   this.setupEventListeners();
  // }

  // setupEventListeners(): void {
  //   const tableElement = this.el.nativeElement.querySelector('app-main-table');
  //
  //   // Handle save button clicks
  //   this.renderer.listen(tableElement, 'click', (event) => {
  //     const saveBtn = event.target.closest('.save-btn');
  //     if (saveBtn) {
  //       const id = parseInt(saveBtn.getAttribute('data-id'));
  //       const select = saveBtn.parentElement.querySelector('.status-select');
  //       const newStatus = select.value;
  //       this.saveStatus(id, newStatus);
  //     }
  //
  //     // Handle cancel button clicks
  //     const cancelBtn = event.target.closest('.cancel-btn');
  //     if (cancelBtn) {
  //       this.cancelEditing();
  //     }
  //   });
  // }

  startEditing(coupon: GetCouponTracking) {
    const dialogRef = this.dialog.open(EditCouponDialogComponent, {
      width: '400px',
      data: {
        currentStatus: coupon.status
      }
    });

    dialogRef.afterClosed().subscribe((newStatus: string) => {
      if (newStatus) {
        this.updateCouponStatus(coupon.id, newStatus);
      }
    });
  }
  updateCouponStatus(id: number, status: string) {
    this.couponService.updateCouponStatus(id, status).subscribe({
      next: () => {
        // Update local data
        const coupon = this.coupons.find(c => c.id === id);
        if (coupon) {
          coupon.status = status;
          this.couponTableConfig.dataSource = [...this.coupons]; // Refresh table
        }
      },
      error: (err) => {
        console.error('Error updating coupon status:', err);
      }
    });
  }
  // saveStatus(id: number, newStatus: string) {
  //   this.couponService.updateCouponStatus(id, newStatus).subscribe({
  //     next: () => {
  //       const coupon = this.coupons.find(c => c.id === id);
  //       if (coupon) {
  //         coupon.status = newStatus;
  //       }
  //       this.cancelEditing();
  //     },
  //     error: (err) => {
  //       console.error('Error updating coupon status:', err);
  //     }
  //   });
  // }

  cancelEditing() {
    this.editingCouponId = null;
    this.editedStatus = '';
    this.couponTableConfig.dataSource = [...this.coupons]; // Refresh table
  }
}
