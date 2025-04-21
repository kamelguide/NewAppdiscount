import { Component, OnInit } from '@angular/core';
import { MainTableComponent } from "../main-table/main-table.component";
import { Product } from "./product.data";
import { ProductService } from './product.service';  // Import ProductService

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MainTableComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];  // Start with an empty array
  selectedProduct: Product | null = null;  // Holds the product to be edited

  productTableConfig = {
    title: 'Product Inventory',
    dataSource: this.products,  // Bind to dynamic products array
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

  constructor(private productService: ProductService) {}

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

  // editProduct(product: Product) {
  //   // Open the product in the edit form (or directly enable editing in the table)
  //   this.selectedProduct = { ...product };  // Copy the selected product data
  //   console.log('Editing product:', product);
  // }

  editProduct(product: Product) {
    // When clicking on "Edit", set the selectedProduct to the clicked product
    this.selectedProduct = { ...product };  // Create a copy of the product to avoid modifying the original directly
    console.log('Editing product:', this.selectedProduct);
  }

  updateProduct(): void {
    if (this.selectedProduct) {
      // Call the updateProduct method from the ProductService
      this.productService.updateProduct(this.selectedProduct.idproduct, this.selectedProduct).subscribe(
        (updatedProduct: Product) => {
          console.log('Updated product:', updatedProduct);
          // Update the product in the table
          const index = this.products.findIndex(p => p.idproduct === updatedProduct.idproduct);
          if (index !== -1) {
            this.products[index] = updatedProduct;
            this.productTableConfig.dataSource = [...this.products];  // Refresh the table with updated data
          }
          // Clear the selected product after update
          this.selectedProduct = null;
        },
        error => {
          console.error('Error updating product:', error);
        }
      );
    }
  }

  deleteProduct(product: Product) {
    console.log('Deleting product:', product);
  }

  viewProduct(product: Product) {
    console.log('Viewing product:', product);
  }
}
