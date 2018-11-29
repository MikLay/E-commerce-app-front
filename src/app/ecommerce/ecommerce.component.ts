import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ProductsComponent} from './products/products.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {OrdersComponent} from './orders/orders.component';
import {Category} from './models/category.model';
import {EcommerceService} from './services/EcommerceService';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {
  searchStr = '';
  categories: Category[] = [];
  private collapsed = true;
  orderFinished = false;
  productIsDetailing = false;

  @ViewChild('productsC')
  productsC: ProductsComponent;

  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent;

  @ViewChild('ordersC')
  ordersC: OrdersComponent;

  closeDetails() {
    if (this.productIsDetailing) {
      this.productIsDetailing = false;
    }
  }


  loadCategoryProducts(id: string) {
    this.productsC.loadProductsByCategory(id);
  }
  constructor(private ecommerceService: EcommerceService) {
  }

  loadProducts() {
    this.productsC.loadProducts();
  }


  ngOnInit() {
    this.categories = [];
    this.loadCategories();
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }

  loadCategories() {
    this.ecommerceService.getAllCategories()
      .subscribe(
        (categories: any[]) => {
          this.categories = categories;
          },
        (error) => console.log(error)
      );
  }

  onHide() {
    this.productIsDetailing = !this.productIsDetailing;
  }



  reset() {
    this.orderFinished = false;
    this.productsC.reset();
    this.shoppingCartC.reset();
    this.ordersC.paid = false;
  }
}
