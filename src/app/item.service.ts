import { EventEmitter } from "@angular/core";
import { cartItem } from "./cart/cart.model";

/* Data Service class that deals with transferring of data between
    the shopping cart and the inventory list */
export class ItemDataService {
    shoppingCart: {[id: number]: cartItem;} = {};
    moviesList = [{
        id: 1,
        name: 'Star Wars Episode IV DVD',
        price: 20,
        image: 'assets/img/starwarsepisode4dvd.jpg'
    },{
        id: 2,
        name: 'Star Wars Episode V DVD',
        price: 20,
        image: 'assets/img/starwarsepisode5dvd.jpg'
    },{
        id: 3,
        name: 'Star Wars Episode VI DVD',
        price: 20,
        image: 'assets/img/starwarsepisode6dvd.jpg'
    },{
        id: 4,
        name: 'Star Wars Episode IV Blu-Ray',
        price: 25,
        image: 'assets/img/starwarsepsiode4bluray.jpg'
    },{
        id: 5,
        name: 'Star Wars Episode V Blu-Ray',
        price: 25,
        image: 'assets/img/starwarsepisode5bluray.jpg'
    },{
        id: 6,
        name: 'Star Wars Episode VI Blu-Ray',
        price: 25,
        image: 'assets/img/starwarsepsiode6bluray.jpg'
    }];

    //event emitter that catches and throws cartItems
    itemAdded = new EventEmitter<cartItem>();
}