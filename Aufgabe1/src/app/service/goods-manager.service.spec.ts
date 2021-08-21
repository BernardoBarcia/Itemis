import { TestBed } from '@angular/core/testing';
import { Good } from '../model/good';

import { GoodsManagerService } from './goods-manager.service';

describe('GoodsManagerService', () => {
  let service: GoodsManagerService;
  const arr1 = [
    new Good(1, 10.99, 'book'),
    new Good(2, 0.5, 'food'),
    new Good(3, 0.5, 'medical product', true),
    new Good(4, 3.99, 'clothes'),
    new Good(5, 99.99, 'furniture', true),
  ];
  // Total Shelf Prices, Total Sales Tax, Total Price
  const pricesArr1 = [10.99, 0.5, 0.55, 4.39, 114.99];
  const valuesArr1 = [15.45, 131.42];

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [GoodsManagerService] });
    service = TestBed.inject(GoodsManagerService);
    service.goods = arr1;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('constructor without params, starting values and getters', () => {
    const serviceMock = new GoodsManagerService();
    expect(serviceMock.goods).toHaveSize(0);
    expect(serviceMock.getTotalTax()).toBe(0);
    expect(serviceMock.getTotalPrice()).toBe(0);
  });

  it('constructor with params', () => {
    const serviceMock = new GoodsManagerService(arr1);
    expect(serviceMock.goods).toHaveSize(5);
    expect(serviceMock.goods).toBe(arr1);
    serviceMock.goods.forEach((elem1, index, _) =>
      expect(arr1[index]).toBe(elem1)
    );
  });

  it('tax and total price calculation', () => {
    service.goods.forEach((elem, i) => {
      expect(elem.getTotalPrice()).toBe(pricesArr1[i]);
    });
    service.calculateReceipt();
    expect(service.getTotalTax()).toBe(valuesArr1[0]);
    expect(service.getTotalPrice()).toBe(valuesArr1[1]);
  });

  it('tests from task description', () => {
    const inp1 = [
      new Good(1, 12.49, 'book'),
      new Good(2, 14.99, 'music cd'),
      new Good(3, 0.85, 'food', undefined, undefined, 'chocolate bar'),
    ];
    const inp2 = [
      new Good(4, 47.5, 'cosmetics', true, 1, 'bottle of perfume'),
      new Good(5, 10.0, 'food', true, 1, 'box of chocolates'),
    ];
    const inp3 = [
      new Good(6, 27.99, 'cosmetics', true, 1, 'bottle of perfume'),
      new Good(7, 18.99, 'cosmetics', undefined, 1, 'bottle of perfume'),
      new Good(8, 9.75, 'medical product', false, 1, 'headache pills'),
      new Good(9, 11.25, 'food', true, undefined, 'box of chocolates'),
    ];
    const out1 = [[12.49, 16.49, 0.85], 1.5, 29.83];
    const out2 = [[54.65, 10.5], 7.65, 65.15];
    const out3 = [[32.19, 20.89, 9.75, 11.85], 6.7, 74.68];

    const service1 = new GoodsManagerService(inp1);
    const service2 = new GoodsManagerService(inp2);
    const service3 = new GoodsManagerService(inp3);

    (<number[]>out1[0]).forEach((elem, i) => {
      expect(elem).toBe(service1.goods[i].getTotalPrice());
    });
    service1.calculateReceipt();
    expect(service1.getTotalTax()).toBe(<number>out1[1]);
    expect(service1.getTotalPrice()).toBe(<number>out1[2]);

    (<number[]>out2[0]).forEach((elem, i) => {
      expect(elem).toBe(service2.goods[i].getTotalPrice());
    });
    service2.calculateReceipt();
    expect(service2.getTotalTax()).toBe(<number>out2[1]);
    expect(service2.getTotalPrice()).toBe(<number>out2[2]);

    (<number[]>out3[0]).forEach((elem, i) => {
      expect(elem).toBe(service3.goods[i].getTotalPrice());
    });
    service3.calculateReceipt();
    expect(service3.getTotalTax()).toBe(<number>out3[1]);
    expect(service3.getTotalPrice()).toBe(<number>out3[2]);
  });
});
