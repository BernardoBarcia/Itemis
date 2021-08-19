import { Injectable } from '@angular/core';
import { Good } from '../model/good';

@Injectable({
  providedIn: 'root',
})
export class GoodsManagerService {
  private goods: Good[];
  // Calculated Values
  private salesTax: number = 0;
  private totalPrice: number = 0;

  constructor(goodsList: Good[] = []) {
    this.goods = goodsList;
  }

  getTotalTax() {
    return this.salesTax;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  calculateTotalTax() {
    this.salesTax = 0;
    this.goods.forEach((good) => {
      this.salesTax += good.getSalesTaxCalculated();
    });
    return this.salesTax;
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.goods.forEach((good) => {
      this.totalPrice += good.getTotalPrice();
    });
    return this.totalPrice;
  }

  calculateReceipt() {
    this.calculateTotalTax();
    this.calculateTotalPrice();
  }
}
