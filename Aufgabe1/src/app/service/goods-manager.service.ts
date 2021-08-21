import { Inject } from '@angular/core';
import { Injectable, Optional } from '@angular/core';
import { Good } from '../model/good';

@Injectable({
  providedIn: 'root',
})
export class GoodsManagerService {
  goods: Good[] = [];
  // Calculated Values
  private salesTax: number = 0;
  private totalPrice: number = 0;

  // constructor() {
  constructor(@Optional() @Inject(Good) goodsList: Good[]) {
    if (goodsList) this.goods = goodsList;
  }

  getTotalTax(): number {
    return Math.round(this.salesTax * 100) / 100;
  }

  getTotalPrice(): number {
    return Math.round(this.totalPrice * 100) / 100;
  }

  calculateTotalTax(): number {
    this.salesTax = 0;
    this.goods.forEach((good) => {
      this.salesTax += good.getSalesTaxCalculated();
    });
    return this.salesTax;
  }

  calculateTotalPrice(): number {
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
