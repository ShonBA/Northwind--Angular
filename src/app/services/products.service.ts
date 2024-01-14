import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import routesConfig from '../Utils/routes.config';
import ProductModel from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public async getAllProducts(): Promise<ProductModel[]> {
    const observable = this.http.get<ProductModel[]>(routesConfig.productsUrl);
    const products = await firstValueFrom(observable);
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
    console.log(addedProduct);
  }

  public async deleteProduct(id: number) {
    const observable = this.http.delete(routesConfig.productsUrl + id);
    await firstValueFrom(observable);
  }


}
