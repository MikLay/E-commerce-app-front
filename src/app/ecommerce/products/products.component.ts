import {Output , Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ProductOrder} from '../models/product-order.model';
import {EcommerceService} from '../services/EcommerceService';
import {Subscription} from 'rxjs/internal/Subscription';
import {ProductOrders} from '../models/product-orders.model';
import {Product} from '../models/product.model';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    @Input() searchStr: string;
  @Input() searchStrCategory: string;
    productOrders: ProductOrder[] = [];
    products: Product[] = [];
    selectedProductOrder: ProductOrder;
    private shoppingCartOrders: ProductOrders;
    sub: Subscription;
    productSelected = false;


  @Output() onHide: EventEmitter<boolean> = new EventEmitter<boolean>();
  setHide() {
    this.onHide.emit(true);
  }
    constructor(private ecommerceService: EcommerceService) {
    }

    ngOnInit() {
        this.productOrders = [];
        this.loadProducts();
        this.loadOrders();
    }

    showProductDetails(productOrder: ProductOrder) {
    this.ecommerceService.showProductDetails(productOrder);
    }

    addToCart(order: ProductOrder) {
        this.ecommerceService.SelectedProductOrder = order;
        this.selectedProductOrder = this.ecommerceService.SelectedProductOrder;
        this.productSelected = true;
    }

    removeFromCart(productOrder: ProductOrder) {
        const index = this.getProductIndex(productOrder.product);
        if (index > -1) {
            this.shoppingCartOrders.productOrders.splice(
                this.getProductIndex(productOrder.product), 1);
        }
        this.ecommerceService.ProductOrders = this.shoppingCartOrders;
        this.shoppingCartOrders = this.ecommerceService.ProductOrders;
        this.productSelected = false;
    }

    getProductIndex(product: Product): number {
        return this.ecommerceService.ProductOrders.productOrders.findIndex(
            value => value.product === product);
    }

    isProductSelected(product: Product): boolean {
        return this.getProductIndex(product) > -1;
    }

    loadProducts() {
        this.ecommerceService.getAllProducts()
            .subscribe(
                (products: any[]) => {
                    this.products = products;
                    this.products.forEach(product => {
                        this.productOrders.push(new ProductOrder(product, 0));
                    });
                },
                (error) => console.log(error)
            );
    }

    loadProductsByCategory(categoryUrl: string) {
    this.ecommerceService.getProductsByCategory(categoryUrl)
      .subscribe(
        (products: any[]) => {
          this.products = products;
          this.productOrders = [];
          this.products.forEach(product => {
            this.productOrders.push(new ProductOrder(product, 0));
          });
        },
        (error) => console.log(error)
      );
  }



  loadOrders() {
        this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
            this.shoppingCartOrders = this.ecommerceService.ProductOrders;
        });
    }

    reset() {
        this.productOrders = [];
        this.loadProducts();
        this.ecommerceService.ProductOrders.productOrders = [];
        this.loadOrders();
        this.productSelected = false;
    }
}
