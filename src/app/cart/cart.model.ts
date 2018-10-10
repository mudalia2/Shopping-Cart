/*
  Class defines the structure of every item in the cart.
  Each cartItem also has some associated member functions
 */

export class cartItem {
    private count: number;
    private name: string;
    private price: number;

    constructor(count: number, name: string, price: number) {
      this.count=count;
      this.name=name;
      this.price=price;
    }

    getCount() {
      return this.count;
    }

    getName() {
      return this.name;
    }

    getIndividualPrice() {
      return this.price;
    }

    //updating count of the item, can be addition or deletion
    setCount(value: number)
    {
      this.count+=value;
    }

    getTotalPrice() {
      return this.price*this.count;
    }
    
  }