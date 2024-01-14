import { Component, Input } from '@angular/core';
import ProductModel from '../../../models/product-model';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  public constructor(private productsService: ProductsService) { }
  @Input()
  public product: ProductModel; // Like props in react.

  public async deleteMe(id: number) {
    try {
      await this.productsService.deleteProduct(id);
    } catch (err: any) { alert(err) };

  }
}
