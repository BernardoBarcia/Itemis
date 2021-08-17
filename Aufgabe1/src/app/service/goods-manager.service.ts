import { Injectable } from '@angular/core';
import { Good } from '../model/good';

@Injectable({
  providedIn: 'root',
})
export class GoodsManagerService {
  private goods: Good[] = [];
  private salesTax: number | undefined;
  private totalTax: number | undefined;

  constructor() {}
}
