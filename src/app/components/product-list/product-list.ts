import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { ProductCardComponent } from '../product-card/product-card';
import { SearchBarComponent } from '../search-bar/search-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, SearchBarComponent],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products;
      this.filteredProducts = products;
    });
  }

  onSearch(query: string): void {
    this.filteredProducts = this.allProducts.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  onAdd(product: Product): void {
    this.cartService.addToCart(product);
  }
}