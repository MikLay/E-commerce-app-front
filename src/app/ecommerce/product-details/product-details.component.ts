import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductOrder} from '../models/product-order.model';
import {EcommerceService} from '../services/EcommerceService';
import {Subscription} from 'rxjs';
import {Product} from '../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  subscription: Subscription;
  order: ProductOrder;
  product: Product = new Product(0, '', 0, '', '', '', 0);

  @Output() onHide: EventEmitter<boolean> = new EventEmitter<boolean>();
  setHide() {
    this.onHide.emit(true);
  }

  constructor(private ecommerceService: EcommerceService) {
  }

  ngOnInit() {
    this.subscription = this.ecommerceService.getEmittedValue()
      .subscribe(item => this.order = item);
    this.order = new ProductOrder(this.product, 0);
  }


}
