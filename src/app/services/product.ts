import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private mockProducts: Product[] = [
    { id: 1, name: 'Eco-friendly Water Bottle', price: 15.99, imageUrl: 'https://placehold.co/300x200.png?text=Water+Bottle', stock: 10 },
    { id: 2, name: 'Wireless Bluetooth Headphones', price: 75.50, imageUrl: 'https://placehold.co/300x200.png?text=Headphones', stock: 4 },
    { id: 3, name: 'Canvas Tote Bag', price: 20.00, imageUrl: 'https://placehold.co/300x200.png?text=Tote+Bag', stock: 25 },
    { id: 4, name: 'Portable Coffee Maker', price: 40.00, imageUrl: 'https://placehold.co/300x200.png?text=Coffee+Maker', stock: 2 },
    { id: 5, name: 'Bamboo Cutlery Set', price: 12.00, imageUrl: 'https://placehold.co/300x200.png?text=Cutlery', stock: 30 },
    { id: 6, name: 'Solar Power Bank', price: 35.00, imageUrl: 'https://placehold.co/300x200.png?text=Power+Bank', stock: 0 },
  ];

  getProducts(): Observable<Product[]> {
    return of(this.mockProducts).pipe(delay(600));
  }
}