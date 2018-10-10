import { Component, OnInit } from "@angular/core";
import { ItemDataService } from "../item.service";
import { cartItem } from "../cart/cart.model";

@Component({
    selector:'app-items',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
/* Sets up the drop down lists for the quantity selector
    Throws cartItems through the event emitter whenever item is added to cart 
*/
export class ItemsComponent implements OnInit{
    //select drop down array
    quantity = [];
    selectedQuantity = {};
    itemToAdd: cartItem;
    moviesList:  {id: number; name: string; price: number; image: string}[];

    constructor(private itemDataService: ItemDataService) {
        //ASSUMPTION: 30 items is the max that can be added at one time
        for(var i=1;i<30;i++)
        {
            this.quantity.push(i);
        }
    }
    
    sendItemToCart(count:number, name: string, price:number) {
        this.itemToAdd = new cartItem(count, name, price)
        this.itemDataService.itemAdded.emit(this.itemToAdd);
    }

    ngOnInit() {
        this.moviesList = this.itemDataService.moviesList;
    } 

}