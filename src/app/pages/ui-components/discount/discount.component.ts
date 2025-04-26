import { Component, OnInit } from '@angular/core';
import { MainTableComponent } from "../main-table/main-table.component";
import { Discount } from "./dicount.data";
import { DiscountService } from './discount.service';
import {Product} from "../products/product.data";  // Import DiscountService

@Component({
  selector: 'app-discount',
  standalone: true,
  imports: [MainTableComponent],
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  discounts: Discount[] = [];  // Start with an empty array

  // Table configuration
  discountTableConfig = {
    title: 'Discount Management',
    dataSource: this.discounts,  // Bind to dynamic discounts array
    showMenu: true,
    menuItems: [
      { icon: 'edit', label: 'Edit', action: (discount: Discount) => this.editDiscount(discount) },

    ],
    columns: [
      {
        name: 'reference',
        header: 'Reference',
        headerClass: 'font-bold',
        cell: (discount: Discount) => `
          <div class="flex flex-col">
            <div class="f-s-14 f-w-600">${discount.refDisc}</div>
            <div class="text-sm text-gray-500">ID: ${discount.idDisc}</div>
          </div>
        `,
        cellClass: ''
      },
      {
        name: 'type',
        header: 'Type',
        cell: (discount: Discount) => `
          <span class="rounded f-w-600 p-6 p-y-4 f-s-12
            ${discount.type === 'Percentage' ? 'bg-light-info text-info' :
          discount.type === 'Fixed Amount' ? 'bg-light-warning text-warning' :
            'bg-light-success text-success'}">
            ${discount.type}
          </span>
        `,
        cellClass: ''
      },
      {
        name: 'value',
        header: 'Value',
        cell: (discount: Discount) => `
          <div class="f-s-14 f-w-600">
            ${discount.type === 'Percentage' ?
          `${discount.valeur}%` :
          `$${discount.valeur.toFixed(2)}`}
          </div>
        `,
        cellClass: ''
      },
      {
        name: 'recovery',
        header: 'Recovery',
        cell: (discount: Discount) => `
          <span class="rounded f-w-600 p-6 p-y-4 f-s-12
            ${discount.recouvrement === 'Automatic' ? 'bg-light-success text-success' : 'bg-light-error text-error'}">
            ${discount.recouvrement}
          </span>
        `,
        cellClass: ''
      },

    ]
  };

  constructor(private discountService: DiscountService) {}

  ngOnInit(): void {
    this.getDiscounts();  // Fetch data when the component initializes
  }

  getDiscounts(): void {
    this.discountService.getDiscountProduct().subscribe(
      (data: Discount[]) => {
        console.log('Fetched Discounts:', data);  // Log data to check if all rows are being returned
        this.discounts = data;  // Assign the fetched data to the discounts array
        this.discountTableConfig.dataSource = this.discounts;  // Update the table with new data
      },
      // error => {
      // //   console.error('Error fetching discounts:', error);
      // }
    );
  }

  editDiscount(discount: Discount) {
    console.log('Editing discount:', discount);
  }

  deleteDiscount(discount: Discount) {
    console.log('Deleting discount:', discount);
  }

  viewDiscount(discount: Discount) {
    console.log('Viewing discount:', discount);
  }
}
