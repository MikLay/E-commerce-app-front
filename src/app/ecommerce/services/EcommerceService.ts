import {ProductOrder} from '../models/product-order.model';
import {Subject} from 'rxjs/internal/Subject';
import {ProductOrders} from '../models/product-orders.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventEmitter, Injectable, Output} from '@angular/core';
import {OrderModel} from '../models/order.model';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable()
export class EcommerceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })
  };
    private productsUrl = 'https://nit.tron.net.ua/api/product/list';
    private categoriesListUrl = 'https://nit.tron.net.ua/api/category/list';
    private ordersUrl = 'https://nit.tron.net.ua/api/order/add';
    private productsByCategory = 'https://nit.tron.net.ua/api/product/list/category/';

    private productOrder: ProductOrder;
    private showOrder: ProductOrder;
    private orders: ProductOrders = new ProductOrders();

    private productOrderSubject = new Subject();
    private ordersSubject = new Subject();
    private totalSubject = new Subject();

    private total: number;

    @Output() choosed: EventEmitter<ProductOrder> = new EventEmitter<ProductOrder>();

    ProductOrderChanged = this.productOrderSubject.asObservable();
    OrdersChanged = this.ordersSubject.asObservable();
    TotalChanged = this.totalSubject.asObservable();

    constructor(private http: HttpClient) {
    }

    showProductDetails(order: ProductOrder) {
      this.choosed.emit(order);
    }

    getEmittedValue() {
      return this.choosed;
    }

    getAllCategories() {
      return this.http.get(this.categoriesListUrl);
    }

    getAllProducts() {
        return this.http.get(this.productsUrl);
    }

    getProductsByCategory(productsByCategoryEnding: string) {
        return this.http.get(this.productsByCategory + productsByCategoryEnding);
    }
    saveOrder(order: OrderModel) {
      let body = `token=${order.token}&name=${order.name}&email=${order.email}&phone=${order.phone}`;
      this.orders.productOrders.forEach((productOrder) => body += '&products[' +
      productOrder.product.id + ']=' + productOrder.quantity);
      console.log(body);
        return this.http.post(this.ordersUrl, body, this.httpOptions);
    }

    set SelectedProductOrder(value: ProductOrder) {
        this.productOrder = value;
        this.productOrderSubject.next();
    }

    get SelectedProductOrder() {
        return this.productOrder;
    }

    set ProductOrders(value: ProductOrders) {
        this.orders = value;
        this.ordersSubject.next();
    }

    get ProductOrders() {
        return this.orders;
    }

    get Total() {
        return this.total;
    }

    set Total(value: number) {
        this.total = value;
        this.totalSubject.next();
    }


}
