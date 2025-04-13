import { Routes } from '@angular/router';

// ui
import { AppTablesComponent } from './tables/tables.component';
import {ProductsComponent} from "./products/products.component";
import {MainTableComponent} from "./main-table/main-table.component";
import {CouponComponent} from "./coupon/coupon.component";

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [


      {
        path: 'main-table',
        component: MainTableComponent,
      },     {
        path: 'tables',
        component: AppTablesComponent,
      },    {
        path: 'products',
        component: ProductsComponent,
      },{
        path: 'Coupon',
        component: CouponComponent,
      },
    ],
  },
];
