import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-panel.html',
  styleUrls: ['./cart-panel.css']
})
export class CartPanelComponent {
  // 1. Declare the property without initializing it here
  cartItems$: Observable<CartItem[]>;

  constructor(private cartService: CartService) {
    // 2. Initialize the property inside the constructor
    this.cartItems$ = this.cartService.items$;
  }

  onRemove(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}