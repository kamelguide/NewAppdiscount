// discount.component.ts
import { Component } from '@angular/core';
import { MainTableComponent } from "../main-table/main-table.component";

interface Discount {
  idDisc: number;
  refDisc: string;
  type: string;
  valeur: number;
  recouvrement: string;
  idLink: number;
}

@Component({
  selector: 'app-discount',
  standalone: true,
  imports: [MainTableComponent],
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent {
  discounts: Discount[] = [
    {
      idDisc: 1,
      refDisc: 'DISC-2023-001',
      type: 'Percentage',
      valeur: 15.0,
      recouvrement: 'Automatic',
      idLink: 101
    },
    {
      idDisc: 2,
      refDisc: 'DISC-2023-002',
      type: 'Fixed Amount',
      valeur: 50.0,
      recouvrement: 'Manual',
      idLink: 102
    },
    {
      idDisc: 3,
      refDisc: 'DISC-2023-003',
      type: 'Seasonal',
      valeur: 20.0,
      recouvrement: 'Automatic',
      idLink: 103
    }
  ];

  discountTableConfig = {
    title: 'Discount Management',
    dataSource: this.discounts,
    showMenu: true,
    menuItems: [
      { icon: 'edit', label: 'Edit', action: (discount: Discount) => this.editDiscount(discount) },
      { icon: 'delete', label: 'Delete', action: (discount: Discount) => this.deleteDiscount(discount) },
      { icon: 'visibility', label: 'View', action: (discount: Discount) => this.viewDiscount(discount) }
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
      {
        name: 'link',
        header: 'Link ID',
        cell: (discount: Discount) => discount.idLink.toString(),
        cellClass: ''
      }
    ]
  };

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
