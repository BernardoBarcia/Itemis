import { environment } from 'src/environments/environment';
export class Good {
  id: number;
  shelfPrice: number;
  static basicTax = environment.basicTax;
  static importTax = environment.importTax;
  productType: string;
  isImported: boolean = false;

  constructor(
    id: number,
    shelfPrice: number,
    productType: string,
    isImported?: boolean
  ) {
    this.id = id;
    this.shelfPrice = shelfPrice;
    this.productType = productType;
    this.isImported = isImported || this.isImported;
  }

  private checkProductTypeBasicTaxExclusion() {
    return environment.excludeBasicTaxGoods.includes(this.productType);
  }

  getSalesTax() {
    // Basic Tax
    let tax = this.checkProductTypeBasicTaxExclusion() ? Good.basicTax : 0;
    // Import Tax
    tax += this.isImported ? Good.importTax : 0;
    return tax;
  }

  getSalesTaxCalculated() {
    // Round to the nearest 0.05
    return (Math.ceil((this.getSalesTax() * this.shelfPrice) / 5) * 5) / 100;
  }

  getTotalPrice() {
    return this.shelfPrice + this.getSalesTaxCalculated();
  }
}
