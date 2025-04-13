// link-product-discount.component.ts
import { Component } from '@angular/core';
import { MainTableComponent } from "../main-table/main-table.component";

interface ProductDiscountLink {
  idLink: number;
  active: boolean;
  duration: number;
  valideFrom: string;
  valideTo: string;
  priority: string;
  product: string;
  idProduct: number;
  discountedPrice: number;
  idDisc: number;
  refDisc: string;
}

@Component({
  selector: 'app-link-product-discount',
  standalone: true,
  imports: [MainTableComponent],
  templateUrl: './link-product-discount.component.html',
  styleUrls: ['./link-product-discount.component.scss']
})
export class LinkProductDiscountComponent {
  discountLinks: ProductDiscountLink[] = [
    {
      idLink: 1,
      active: true,
      duration: 30,
      valideFrom: '2023-11-01',
      valideTo: '2023-11-30',
      priority: 'high',
      product: 'Smartphone X',
      idProduct: 101,
      discountedPrice: 699.99,
      idDisc: 1001,
      refDisc: 'DISC-2023-1001'
    },
    {
      idLink: 2,
      active: false,
      duration: 15,
      valideFrom: '2023-10-15',
      valideTo: '2023-10-30',
      priority: 'medium',
      product: 'Laptop Pro',
      idProduct: 102,
      discountedPrice: 1099.99,
      idDisc: 1002,
      refDisc: 'DISC-2023-1002'
    },
    {
      idLink: 3,
      active: true,
      duration: 7,
      valideFrom: '2023-12-01',
      valideTo: '2023-12-07',
      priority: 'low',
      product: 'Wireless Headphones',
      idProduct: 103,
      discountedPrice: 149.99,
      idDisc: 1003,
      refDisc: 'DISC-2023-1003'
    }
  ];

  discountLinkTableConfig = {
    title: 'Product Discount Links',
    dataSource: this.discountLinks,
    showMenu: true,
    menuItems: [
      { icon: 'edit', label: 'Edit', action: (link: ProductDiscountLink) => this.editLink(link) },
      { icon: 'delete', label: 'Delete', action: (link: ProductDiscountLink) => this.deleteLink(link) },
      { icon: 'visibility', label: 'View', action: (link: ProductDiscountLink) => this.viewLink(link) }
    ],
    columns: [
      {
        name: 'product',
        header: 'Product',
        headerClass: 'font-bold',
        cellClass: 'flex items-center',
        cell: (link: ProductDiscountLink) => `
          <div class="flex flex-col">
            <div class="f-s-14 f-w-600">${link.product}</div>
            <div class="text-sm text-gray-500">ID: ${link.idProduct}</div>
          </div>
        `
      },
      {
        name: 'discountInfo',
        header: 'Discount Info',
        cell: (link: ProductDiscountLink) => `
          <div class="flex flex-col">
            <div>Ref: ${link.refDisc}</div>
            <div>ID: ${link.idDisc}</div>
          </div>
        `
      },
      {
        name: 'price',
        header: 'Discounted Price',
        cell: (link: ProductDiscountLink) => `$${link.discountedPrice.toFixed(2)}`
      },
      {
        name: 'validity',
        header: 'Validity Period',
        cell: (link: ProductDiscountLink) => `
          <div class="flex flex-col">
            <div>From: ${link.valideFrom}</div>
            <div>To: ${link.valideTo}</div>
            <div class="text-sm">${link.duration} days</div>
          </div>
        `
      },
      {
        name: 'status',
        header: 'Status',
        cell: (link: ProductDiscountLink) => {
          if (link.active) {
            return `<span class="bg-light-success text-success rounded f-w-600 p-6 p-y-4 f-s-12">Active</span>`;
          } else {
            return `<span class="bg-light-error text-error rounded f-w-600 p-6 p-y-4 f-s-12">Inactive</span>`;
          }
        }
      },
      {
        name: 'priority',
        header: 'Priority',
        cell: (link: ProductDiscountLink) => {
          const priorityClass = {
            'high': 'bg-light-error text-error',
            'medium': 'bg-light-warning text-warning',
            'low': 'bg-light-success text-success'
          }[link.priority] || 'bg-gray-100 text-gray-800';

          return `<span class="${priorityClass} rounded f-w-600 p-6 p-y-4 f-s-12">
            ${link.priority.charAt(0).toUpperCase() + link.priority.slice(1)}
          </span>`;
        }
      }
    ]
  };

  editLink(link: ProductDiscountLink) {
    console.log('Editing link:', link);
  }

  deleteLink(link: ProductDiscountLink) {
    console.log('Deleting link:', link);
  }

  viewLink(link: ProductDiscountLink) {
    console.log('Viewing link:', link);
  }
}
