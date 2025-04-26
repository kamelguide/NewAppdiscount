import { Component, OnInit } from '@angular/core';
import { MainTableComponent } from "../main-table/main-table.component";
import { Product } from "./product.data";
import { ProductService } from './product.service';
import {MatDialog} from "@angular/material/dialog";
import {EditProductDialogComponent} from "./edit-product-dialog/edit-product-dialog.component";
import {CreateProductDialogComponent} from "./create-product-dialog/create-product-dialog.component";
import {MatButton} from "@angular/material/button";  // Import ProductService

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MainTableComponent, MatButton],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = []; // Start with an empty array
  productTableConfig = {
    title: 'Product Inventory',
    dataSource: this.products,  // Bind to dynamic products array
    showMenu: true,
    menuItems: [
      { icon: 'edit', label: 'Edit', action: (product: Product) => this.editProduct(product) },

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

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProducts();  // Fetch data when the component initializes
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;  // Assign the fetched data to the products array
        this.productTableConfig.dataSource = this.products;  // Update the table with new data
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '500px',
      data: { ...product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.updateProduct(result.idproduct, result).subscribe(
          updated => {
            const index = this.products.findIndex(p => p.idproduct === updated.idproduct);
            if (index !== -1) {
              this.products[index] = updated;
              this.productTableConfig.dataSource = [...this.products]; // Refresh table binding
            }
          },
          error => {
            console.error('Update failed', error);
          }
        );
      }
    });
  }
  openCreateProductDialog() {
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.createProduct(result).subscribe(
          newProduct => {
            this.products.push(newProduct);
            this.productTableConfig.dataSource = [...this.products]; // Refresh table
          },
          error => console.error('Create failed', error)
        );
      }
    });
  }
  deleteProduct(product: Product) {
    console.log('Deleting product:', product);
  }

  viewProduct(product: Product) {
    console.log('Viewing product:', product);
  }
}
