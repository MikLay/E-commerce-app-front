import {Component, OnInit} from '@angular/core';
import {ProductOrders} from '../models/product-orders.model';
import {Subscription} from 'rxjs/internal/Subscription';
import {EcommerceService} from '../services/EcommerceService';
import {OrderModel} from '../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: ProductOrders;
  total: number;
  paid: boolean;
  sub: Subscription;
  private resultOrder: OrderModel;
  name = '';
  phone = '';
  email = '';
  token = 'T2QcNybVSgZkcIPJroqx';
  constructor(private ecommerceService: EcommerceService) {
    this.orders = this.ecommerceService.ProductOrders;
  }

  ngOnInit() {
    this.resultOrder = new OrderModel();
    this.paid = false;
    this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
      this.orders = this.ecommerceService.ProductOrders;
    });
    this.loadTotal();
  }

  pay() {
    this.paid = true;
    this.resultOrder.token = this.token;
    this.resultOrder.name = this.name;
    this.resultOrder.email = this.email;
    this.resultOrder.phone = this.phone;
    this.orders.productOrders.forEach((productOrder) => this.resultOrder['product[' +
    productOrder.product.id + ']'] = productOrder.quantity);
    console.log(this.resultOrder);
    this.ecommerceService.saveOrder(this.resultOrder).subscribe();
  }

  loadTotal() {
    this.sub = this.ecommerceService.TotalChanged.subscribe(() => {
      this.total = this.ecommerceService.Total;
    });
  }
}
