import { CommonModule } from '@angular/common';
import { Component, OnInit, } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import ProductModel from '../../../models/product-model';
import { ProductsService } from '../../../services/products.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{
  public products: ProductModel[];

  public constructor(private title: Title, private productsService:ProductsService) { }

  public async ngOnInit() {
      try {
          this.title.setTitle("Product List");
          this.products = await this.productsService.getAllProducts();
      }
      catch (err: any) {
          alert(err.message);
      }
  }

}
