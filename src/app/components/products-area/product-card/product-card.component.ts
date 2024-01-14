import { Component, Input } from '@angular/core';
import ProductModel from '../../../models/product-model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  
  @Input()
  public product: ProductModel; // Like props in react.
  
}
