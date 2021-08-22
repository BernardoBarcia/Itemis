# Good Class 
This class describes a good o be used in the application.

## Object Properties
- id : number (Unique to every product)
- shelf price : number (float number, ex. 12.99 $)
- basic tax : number (static, integer value - ex. 10% = 10)
- import tax : number (static, integer value - ex. 10% = 10)
- product type : string (helps determine if basic tay applies)
- product name : string (Name of the product, can be left blank since products are identified by id first and foremost)
- is imported: boolean
- amount: number 

## Methods
- **constructor(id, shelf price, product type)**: Optional product name, is imported, and amount.
- **checkProductTypeBasicTaxExclusion() : boolean**: Determines if product type is excluded from basic tax.
- **getSalesTax() : number**: Returns Sales Tax as an integer, ex. 20% sales tax is 20.
- **getSalesTaxCalculated() : number**: Returns sales tax value based off price.
- **getTotalPrice() : number**: Shelf Price + Sales Tax.

## Notes
- Sales tax (basic + import tax) is rounded up to the nearest 0.05 price.

## Currently defined values
- basic tax : 10%
- import tax : 5%
- Products types excluded from basic tax: books, food, medical products


