import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import routesConfig from '../Utils/routes.config';
import ProductModel from '../models/product-model';
import { ProductActionTypes, ProductsAction, productsStore } from '../redux/products-state';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public async getAllProducts(): Promise<ProductModel[]> {
    let products = productsStore.getState().products;
    if (products.length === 0) {
      const observable = this.http.get<ProductModel[]>(routesConfig.productsUrl);
      products = await firstValueFrom(observable);
    }
    const action: ProductsAction = { type: ProductActionTypes.SetProducts, payload: products };
    productsStore.dispatch(action);
    return products;
  };

  public async addProduct(product: ProductModel): Promise<void> {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("stock", product.stock.toString());
    formData.append("image", product.image);
    const observable = this.http.post<ProductModel>(routesConfig.productsUrl, formData);
    const addedProduct = await firstValueFrom(observable);
    const action: ProductsAction = { type: ProductActionTypes.AddProduct, payload: addedProduct };
    productsStore.dispatch(action);
  }

  public async deleteProduct(id: number) {
    const observable = this.http.delete(routesConfig.productsUrl + id);
    const action: ProductsAction = { type: ProductActionTypes.DeleteProduct, payload: id };
    productsStore.dispatch(action);
    await firstValueFrom(observable);
  }


}
