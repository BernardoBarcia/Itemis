import { TestBed } from '@angular/core/testing';
import { Good } from './good';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

describe('Good', () => {
  const basicTax = environment.basicTax;
  const importTax = environment.importTax;
  const goodsBasicTax = [
    new Good(0, 14.12, 'clothes', false, 1),
    new Good(1, 100, 'furniture', false, 1),
  ];
  const goodsNoBasicTax = [
    new Good(0, 8, 'medical product'),
    new Good(1, 10.99, 'book'),
    new Good(2, 0.5, 'food'),
  ];
  const goodsBasicTaxImp = [
    new Good(0, 14.12, 'clothes', true),
    new Good(1, 100, 'furniture', true),
  ];
  const goodsNoBasicTaxImp = [
    new Good(0, 8, 'medical product', true),
    new Good(1, 10.99, 'book', true),
    new Good(2, 0.5, 'food', true),
  ];
  // 0.Shelf Price, 1.basic tax, 2.import tax, 3.sales tax (basic + import tax),
  // 4.Total Price (basic tax), 5.Total Price (import tax), 6.Total Price (both)
  const valuesArrBT = [
    [14.12, 1.45, 0.75, 2.15, 15.57, 14.87, 16.27],
    [100, 10, 5, 15, 110, 105, 115],
  ];
  const valuesArrNBT = [
    [8, 0, 0.4, 0.4, 8, 8.4, 8.4],
    [10.99, 0, 0.55, 0.55, 10.99, 11.54, 11.54],
    [0.5, 0, 0.05, 0.05, 0.5, 0.55, 0.55],
  ];

  it('good creation', () => {
    const good = new Good(1, 0.99, 'book');
    expect(good).toBeTruthy();
    expect(good.isImported).toBeFalsy();
    expect(good.amount).toBe(1);
    expect(good.productName).toBe('');
    const good1 = new Good(1, 0.99, 'book', true);
    const good2 = new Good(1, 0.99, 'book', undefined, 3);
    const good3 = new Good(1, 0.99, 'book', true, 5);
    expect(good1.isImported).toBeTruthy();
    expect(good1.amount).toBe(1);
    expect(good2.isImported).toBeFalsy();
    expect(good2.amount).toBe(3);
    expect(good3.isImported).toBeTruthy();
    expect(good3.amount).toBe(5);
    const good4 = new Good(
      1,
      0.99,
      'book',
      undefined,
      undefined,
      'The Seven Moons'
    );
    const good5 = new Good(1, 12, 'book', true, 1, 'Pride');
    expect(good4.isImported).toBeFalsy();
    expect(good4.amount).toBe(1);
    expect(good4.productName).toBe('The Seven Moons');
    expect(good5.isImported).toBeTruthy();
    expect(good5.amount).toBe(1);
    expect(good5.productName).toBe('Pride');
  });

  it('basic tax calculation (standard)', () => {
    goodsBasicTax.forEach((elem, index) => {
      expect(elem.getSalesTax()).toBe(basicTax);
      expect(elem.shelfPrice).toBe(valuesArrBT[index][0]);
      expect(elem.getSalesTaxCalculated()).toBe(valuesArrBT[index][1]);
      expect(elem.getTotalPrice()).toBe(valuesArrBT[index][4]);
    });
  });

  it('basic tax calculation (excluded)', () => {
    goodsNoBasicTax.forEach((elem, index) => {
      expect(elem.getSalesTax()).toBe(0);
      expect(elem.shelfPrice).toBe(valuesArrNBT[index][0]);
      expect(elem.getSalesTaxCalculated()).toBe(valuesArrNBT[index][1]);
      expect(elem.getTotalPrice()).toBe(valuesArrNBT[index][4]);
    });
  });

  it('import tax calculation (with basic tax - standard)', () => {
    goodsBasicTaxImp.forEach((elem, index) => {
      elem.isImported = true;
      expect(elem.getSalesTax()).toBe(basicTax + importTax);
      expect(elem.getSalesTaxCalculated()).toBe(valuesArrBT[index][3]);
      expect(elem.getTotalPrice()).toBe(valuesArrBT[index][6]);
    });
  });

  it('basic tax calculation (without basic tax - excluded)', () => {
    goodsNoBasicTaxImp.forEach((elem, index) => {
      elem.isImported = true;
      expect(elem.getSalesTax()).toBe(importTax);
      expect(elem.getSalesTaxCalculated()).toBe(valuesArrNBT[index][3]);
      expect(elem.getTotalPrice()).toBe(valuesArrNBT[index][6]);
    });
  });
});
