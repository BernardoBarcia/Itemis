# Goods Object Properties

- id : number
- shelf price : number
- basic tax : number (static)
- import tax : number (static)
- product type : string (helps determine if basic tay applies)
- isImported: boolean

## Currently defined values
- basic tax : 10%
- import tax : 5%
- Products types excluded from basic tax: books, food, medical products

## Additional
Sales tax (basic + import tax) is rounded up to the nearest 0.05 price.

