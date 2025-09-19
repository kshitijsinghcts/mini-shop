import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  cartCount$: Observable<number> = this.items$.pipe(
    map(items => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  addToCart(product: Product): void {
    const currentItems = this.itemsSubject.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentItems.push({ product, quantity: 1 });
    }
    this.itemsSubject.next([...currentItems]);
  }

  removeFromCart(productId: number): void {
    const currentItems = this.itemsSubject.getValue().filter(item => item.product.id !== productId);
    this.itemsSubject.next(currentItems);
  }
}