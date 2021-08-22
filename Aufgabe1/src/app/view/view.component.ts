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
    this.getGoods();
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
        `<p>${good.amount} ${good.productName} ${
          good.isImported ? '(imported)' : ''
        }: $ ${good.getTotalPrice()}</p>`
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

  private getGoods() {
    //
    this.goodList.push(
      new Good(1, 12.49, 'book', false, 0, 'Book of the Wind')
    );
    this.goodList.push(
      new Good(
        2,
        14.99,
        'music cd',
        false,
        0,
        'Top Hits of The Onesiders (Music CD)'
      )
    );
    this.goodList.push(new Good(3, 0.85, 'food', false, 0, 'Chocolate Bar'));
    this.goodList.push(new Good(4, 10.0, 'food', true, 0, 'Box of Chocolates'));
    this.goodList.push(
      new Good(5, 47.5, 'perfume', true, 0, 'Bottle of perfume (Channel)')
    );
    this.goodList.push(
      new Good(6, 27.99, 'perfume', true, 0, 'Bottle of perfume (DiGiorno)')
    );
    this.goodList.push(
      new Good(7, 18.99, 'perfume', false, 0, 'Bottle of perfume (Mueller)')
    );
    this.goodList.push(
      new Good(8, 9.75, 'medical product', false, 0, 'Headache pills')
    );
    this.goodList.push(
      new Good(9, 11.25, 'food', true, 0, 'Box of Chocolates')
    );
    this.goodList.push(new Good(10, 3.0, 'clothes', false, 0, 'White Shirt'));
  }
}
