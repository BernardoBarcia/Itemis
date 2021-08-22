# GoodsManagerService Service
This service Manages the goods of the application. Specifically those that the user will buy.

## Object Properties
- goods : Good[] (List of goods to buy)
- sales tax : number (Sum of all sales taxes)
- total price : number (Sum of all total good prices)

## Methods
- **constructor**: Optional Argument of a list of goods.
- **getTotalTax : number**: Returns sales tax.
- **getTotalTax : number**: Returns total price.
- **getNumberOfGoods() : number**: Sums the amount of all bought goods.
- **calculateTotalTax() : number**: Calculate and return sales tax.
- **calculateTotalPrice() : number**: Calculate and return total price.
- **calculateReceipt()**: Does calculateTotalTax and calculateTotalPrice.
- **addGood(good : Good)**: Adds a good to the list. Prevents adding the same good by comparing ids.
- **removeGood(good : Good)**: Removes a good to the list.

