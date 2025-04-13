import { Component } from '@angular/core';
import { MainTableComponent } from "../main-table/main-table.component";

interface Product {
  idproduct: number;
  referenceProduct: string;
  description: string;
  comment: string;
  price: number;
  quantiteDiscount: number;
  image: string;
  status: 'in-stock' | 'out-of-stock' | 'low-stock';
  id_category: number;
  categorie: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MainTableComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = [
    {
      idproduct: 1,
      referenceProduct: 'REF-001',
      description: 'Smartphone X',
      comment: 'Latest model with advanced features',
      price: 799.99,
      quantiteDiscount: 5,
      image: 'assets/images/products/product-1.png',
      status: 'in-stock',
      id_category: 1,
      categorie: 'Electronics'
    },
    {
      idproduct: 2,
      referenceProduct: 'REF-002',
      description: 'Laptop Pro',
      comment: 'High performance laptop',
      price: 1299.99,
      quantiteDiscount: 10,
      image: 'assets/images/products/product-2.png',
      status: 'out-of-stock',
      id_category: 1,
      categorie: 'Electronics'
    },
    {
      idproduct: 3,
      referenceProduct: 'REF-003',
      description: 'Wireless Headphones',
      comment: 'Noise cancelling technology',
      price: 199.99,
      quantiteDiscount: 3,
      image: 'assets/images/products/product-3.png',
      status: 'low-stock',
      id_category: 2,
      categorie: 'Audio'
    }
  ];

  productTableConfig = {
    title: 'Product Inventory',
    dataSource: this.products,
    showMenu: true,
    menuItems: [
      { icon: 'edit', label: 'Edit', action: (product: Product) => this.editProduct(product) },
      { icon: 'delete', label: 'Delete', action: (product: Product) => this.deleteProduct(product) },
      { icon: 'visibility', label: 'View', action: (product: Product) => this.viewProduct(product) }
    ],
    columns: [
      {
        name: 'product',
        header: 'Product',
        headerClass: 'font-bold',
        cellClass: 'flex items-center',
        cell: (product: Product) => `
          <div class="flex items-center gap-4">
            <img src="${product.image}" width="60" class="rounded" alt="${product.description}"/>
            <div>
              <div class="f-s-14 f-w-600">${product.description}</div>
              <div class="f-s-14 f-w-600">Ref: ${product.referenceProduct}</div>
              <div class="f-s-14 f-w-600">ID: ${product.idproduct}</div>
            </div>
          </div>
        `
      },
      {
        name: 'category',
        header: 'Category',
        cell: (product: Product) => product.categorie
      },
      {
        name: 'price',
        header: 'Price',
        cell: (product: Product) => `$${product.price.toFixed(2)}`
      },
      {
        name: 'discount',
        header: 'Discount Qty',
        cell: (product: Product) => product.quantiteDiscount.toString()
      },
      {
        name: 'status',
        header: 'Status',
        cell: (product: Product) => {
          if (product.status === 'in-stock') {
            return `<span class="bg-light-success text-success rounded f-w-600 p-6 p-y-4 f-s-12">In Stock</span>`;
          } else if (product.status === 'out-of-stock') {
            return `<span class="bg-light-error text-error rounded f-w-600 p-6 p-y-4 f-s-12">Out of Stock</span>`;
          } else {
            return `<span class="bg-light-warning text-warning rounded f-w-600 p-6 p-y-4 f-s-12">Low Stock</span>`;
          }
        }
      },
      {
        name: 'comment',
        header: 'Comment',
        cell: (product: Product) => product.comment || 'No comment'
      }
    ]
  };

  editProduct(product: Product) {
    console.log('Editing product:', product);
  }

  deleteProduct(product: Product) {
    console.log('Deleting product:', product);
  }

  viewProduct(product: Product) {
    console.log('Viewing product:', product);
  }
}
