import { environment } from 'src/environments/environment';
export class Good {
  id: number;
  shelfPrice: number;
  static basicTax = environment.basicTax;
  static importTax = environment.importTax;
  productType: string;
  isImported: boolean = false;
  amount: number = 1;
  productName: string = '';

  constructor(
    id: number,
    shelfPrice: number,
    productType: string,
    isImported?: boolean,
    amount?: number,
    productName?: string
  ) {
    this.id = id;
    this.shelfPrice = shelfPrice;
    this.productType = productType;
    this.isImported = isImported || this.isImported;
    if (amount !== undefined) this.amount = amount;
    this.productName = productName || this.productName;
  }

  private checkProductTypeBasicTaxExclusion() {
    return environment.excludeBasicTaxGoods.includes(this.productType);
  }

  getSalesTax(): number {
    // Basic Tax
    let tax = !this.checkProductTypeBasicTaxExclusion() ? Good.basicTax : 0;
    // Import Tax
    tax += this.isImported ? Good.importTax : 0;
    return tax;
  }

  getSalesTaxCalculated(): number {
    // Round to the nearest 0.05
    return (
      (Math.ceil((this.getSalesTax() * this.shelfPrice) / 5) *
        5 *
        this.amount) /
      100
    );
  }

  getTotalPrice(): number {
    return (
      Math.round(
        (this.shelfPrice * this.amount + this.getSalesTaxCalculated()) * 100
      ) / 100
    );
  }
}
