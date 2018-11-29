import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchName',
  pure: false
})
export class SearchPipeName implements PipeTransform {
 transform(productOrders, value) {
  return productOrders.filter( productOrder => {
    return productOrder.product.name.toLowerCase().includes(value.toLowerCase());
  });
 }
}


