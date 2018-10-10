import { Component, OnInit } from '@angular/core';
import { ItemDataService } from '../item.service';
import { cartItem } from './cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

/* 
  Deals with all functionailties inside the cart.
  Catches cartItems from the inventory component
  Calculates TotalAmount, Discounts and Total Item in the cart
*/
export class CartComponent implements OnInit{
  subTotalPrice: number;
  totalItems: number;
  dvdTotalPrice: number;
  bluerayTotalPrice: number;
  dvdDiscountPrice: number;
  bluerayDiscountPrice: number;
  objectKeys = Object.values;
  moviesInCart: Set<string>;
  dvdList: Set<string>;
  bluerayList: Set<string>;
  shoppingCart: {[id: number]: cartItem;} = {};

  constructor(private itemDataService: ItemDataService) { 
    this.itemDataService.itemAdded.subscribe(
      (item: cartItem) => this.addItemsToCart(item)
    );
  }

  ngOnInit() {
    this.dvdTotalPrice = 0;
    this.bluerayTotalPrice = 0;
    this.dvdDiscountPrice = 0;
    this.bluerayDiscountPrice = 0;
    this.subTotalPrice = 0;
    this.totalItems = 0;
    this.moviesInCart = new Set();
    this.dvdList = new Set();
    this.bluerayList = new Set();
    this.dvdList.add("Star Wars Episode IV DVD").add("Star Wars Episode V DVD").add("Star Wars Episode VI DVD");
    this.bluerayList.add("Star Wars Episode IV Blu-Ray").add("Star Wars Episode V Blu-Ray").add("Star Wars Episode VI Blu-Ray");
  }

  addItemsToCart(item: cartItem) {
    var key = item.getName();
    if(this.shoppingCart[key] !== undefined) {
        this.shoppingCart[key].setCount(item.getCount());
    }
    else{
        this.moviesInCart.add(key)
        this.shoppingCart[key] = new cartItem(item.getCount(),item.getName(),item.getIndividualPrice());
    }
    this.updateSubTotalPrice();
    this.updateDiscounts();
    this.updateTotalItems();
  }

  updateItemCount(item: cartItem, value: number) {
    item.setCount(value);
    this.updateSubTotalPrice();
    this.updateDiscounts();
    this.updateTotalItems();
  }

  removeAllItemsFromCartById(id: number) {
    this.moviesInCart.delete(this.shoppingCart[id].getName());
    delete this.shoppingCart[id];
    this.updateSubTotalPrice();
    this.updateDiscounts();
    this.updateTotalItems();
  }

  //Total Price without any discount
  updateSubTotalPrice(){
    var dvdtotal = 0;
    var bluraytotal =0;
    var values: cartItem[] = this.getValues();
    values.forEach(item => {
      if(this.dvdList.has(item.getName()))
        dvdtotal += item.getTotalPrice();
      else
        bluraytotal += item.getTotalPrice();
    });

    this.dvdTotalPrice = +dvdtotal;
    this.bluerayTotalPrice = +bluraytotal;
  }

  //check whether DVD discount should be added
  addDvdDiscount() {
    for(var it = this.dvdList.values(), val= null; val=it.next().value;) {
      if(!this.moviesInCart.has(val))
      {
        return false;
      }
    }
    return true;
  }

  //check whether Bluray discount should be added
  addBlurayDiscount() {
    for(var it = this.bluerayList.values(), val= null; val=it.next().value;) {
      if(!this.moviesInCart.has(val))
      {
        return false;
      }
    }
      return true;
  }

  updateDiscounts() {
    this.dvdDiscountPrice = 0;
    this.bluerayDiscountPrice = 0;
    if(this.addDvdDiscount())
    {
      this.dvdDiscountPrice = this.dvdTotalPrice*0.1;
    }
    if(this.addBlurayDiscount())
    {
      this.bluerayDiscountPrice = this.bluerayTotalPrice*0.1;
    }
  }

  getDvdDiscount() {
    return this.dvdDiscountPrice;
  }

  getBlurayDiscount() {
    return this.bluerayDiscountPrice;
  }

  getBulkDiscount() {
    if(this.getTotalItems()>100)
    {
      return this.getTotalPrice()*.05;
    }
    else
      return 0;
  }

  getTotalPrice() {
    return this.dvdTotalPrice+ this.bluerayTotalPrice-this.dvdDiscountPrice-this.bluerayDiscountPrice;
  }

  getTotalPriceWithBulkDiscount() {
    return this.getTotalPrice() - this.getBulkDiscount();
  }

  updateTotalItems(){
    var total = 0;
    var values = this.getValues();
    values.forEach(function (item: cartItem) {
        total += item.getCount();
    });
    this.totalItems = +total;
  }

  getTotalItems() {
    return this.totalItems;
  }

  getKeyByValue(value: string) {
    return Object.keys(this.shoppingCart).find(key => this.shoppingCart[key] === value);
  }

  getValues() {
    return Object.keys(this.shoppingCart).map((key)=>{ return this.shoppingCart[key]});
  }
}
