import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart';
import { ProductListComponent } from './components/product-list/product-list';
import { CartPanelComponent } from './components/cart-panel/cart-panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductListComponent, CartPanelComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'mini-shop';

  // Inject CartService so the template can access its public properties
  constructor(public cartService: CartService) {}
}