# Goods Object Properties

- id : number
- shelf price : number (float number, ex. 12.99 $)
- basic tax : number (static)
- import tax : number (static)
- product type : string (helps determine if basic tay applies)
- product name : string (Name of the product, can be left blank since products are identified by id first and foremost)
- isImported: boolean

## Currently defined values
- basic tax : 10%
- import tax : 5%
- Products types excluded from basic tax: books, food, medical products

## Additional
Sales tax (basic + import tax) is rounded up to the nearest 0.05 price.

