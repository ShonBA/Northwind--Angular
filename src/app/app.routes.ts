import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/employees-area/add-employee/add-employee.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { EditProductComponent } from './components/products-area/edit-product/edit-product.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { EmployeesListComponent } from './components/employees-area/employees-list/employees-list.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "products", component: ProductsListComponent },
    { path: "new-product", component: AddProductComponent },
    { path: "new-product", component: EditProductComponent },
    { path: "employees", component: EmployeesListComponent },
    { path: "new-employee", component: AddEmployeeComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" }, 
    { path: "**", component: PageNotFoundComponent }
    
];
