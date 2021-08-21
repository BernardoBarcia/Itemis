import { Component, OnInit } from '@angular/core';
import { Good } from '../model/good';
import { GoodsManagerService } from '../service/goods-manager.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  //Items that can be bought
  goodList: Good[];
  constructor(private goodsService: GoodsManagerService) {
    this.goodList = [];
  }

  ngOnInit(): void {
    this.createItems();
  }

  generateReceipt() {
    const elem = document.querySelector('.calculatedReceipt');
    if (this.goodsService.goods.length !== 0) {
      elem?.classList.remove('invisible');
      this.goodsService.calculateReceipt();
      this.writeReceipt();
    } else {
      elem?.classList.add('invisible');
    }
  }
  writeReceipt() {
    const receipt = document.querySelector('.receipt');
    receipt && (receipt.innerHTML = '');
    this.goodsService.goods.forEach((good) => {
      receipt?.insertAdjacentHTML(
        'beforeend',
        `<p>${good.amount} ${good.productName}: $ ${good.getTotalPrice()}</p>`
      );
    });
    receipt?.insertAdjacentHTML(
      'beforeend',
      `<p style="bold">Sales Tax: ${this.goodsService.getTotalTax()}</p>`
    );
    receipt?.insertAdjacentHTML(
      'beforeend',
      `<p style="bold">Total: ${this.goodsService.getTotalPrice()}</p>`
    );
  }

  changeAmount(good: Good, amount: number) {
    let val = good.amount + amount;
    if (val <= 0) {
      val = 0;
      this.goodsService.removeGood(good);
    } else this.goodsService.addGood(good);
    good.amount = val;
  }

  buyItems() {
    window.alert(`You bought ${this.goodsService.getNumberOfGoods()} items`);
  }

  private createItems() {
    this.goodList.push(new Good(1, 9.99, 'book', false, 0, 'Book of the Wind'));
    this.goodList.push(new Good(2, 0.99, 'food', false, 0, 'Chocolate Bar'));
    this.goodList.push(
      new Good(3, 4.99, 'medical product', false, 0, 'Box of Aspirin')
    );
    this.goodList.push(new Good(4, 3, 'clothes', false, 0, 'White Shirt'));
    this.goodList.push(
      new Good(5, 15.49, 'cosmetics', false, 0, 'Bottle of perfume')
    );
    this.goodList.push(
      new Good(6, 27.99, 'cosmetics', true, 0, 'Bottle of perfume')
    );
  }
}
