# View Component 
This component defines a simple UI for the application.

## HTML Description
The view has 2 sections. The left side has a list of goods that can be bought by increasing the amount of goods from 0. Goods with an amount of 0 will not be bought. The right side show the info of the receipt. At first there is only a button for generating the receipt, which when pressed calculates the values of the receipt and shows its information. 

## Object Properties
- good list : Good[] (Goods that can be bought)
- goods service: GoodsManagerService (Service manages the goods that will be bought, aka the shopping list)

## Methods
- **constructor(goods service: GoodsManagerService)**
- **generateReceipt()**: Calculates receipt values.
- **writeReceipt()**: Writes the receipt information on the HTML and makes it visible.
- **changeAmount(good: Good, amount: number)**: Changes the amount of items of a selected good. Goods with an amount greater than 0 are added to the shopping list.
- **buyItems()**: Buys the goods on the receipt.
- **getGoods()**: Creates a list goods that can be bought.

