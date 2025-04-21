import { Component, OnInit } from '@angular/core';
import { MainTableComponent } from "../main-table/main-table.component";
import { ProductDiscountLink } from "./linkProduct.data";
import { LinkProductService } from './link-product.service';  // Import LinkProductService

@Component({
  selector: 'app-link-product-discount',
  standalone: true,
  imports: [MainTableComponent],
  templateUrl: './link-product-discount.component.html',
  styleUrls: ['./link-product-discount.component.scss']
})
export class LinkProductDiscountComponent implements OnInit {
  discountLinks: ProductDiscountLink[] = [];  // Start with an empty array
  discountLinkTableConfig = {
    title: 'Product Discount Links',
    dataSource: this.discountLinks,  // Bind to dynamic discountLinks array
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
        name: 'price',
        header: 'Discounted Price',
        cell: (link: ProductDiscountLink) => `$${link.discountedPrice.toFixed(2)}`
      },
      {
        name: 'jours',
        header: 'Jours',
        cell: (link: ProductDiscountLink) => `${link.jours}`
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

  constructor(private linkProductService: LinkProductService) {}

  ngOnInit(): void {
    this.getLinkedProducts();  // Fetch data when the component initializes
  }

  getLinkedProducts(): void {
    this.linkProductService.getLinkedProducts().subscribe(
      (data: ProductDiscountLink[]) => {
        console.log('Fetched Product Discount Links:', data);  // Log data to check if all rows are being returned
        this.discountLinks = data;  // Assign the fetched data to the discountLinks array
        this.discountLinkTableConfig.dataSource = this.discountLinks;  // Update the table with new data
      },
      error => {
        console.error('Error fetching product discount links:', error);
      }
    );
  }

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
