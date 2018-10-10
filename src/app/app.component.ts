import { Component, OnInit } from '@angular/core';
import { ItemDataService } from './item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ItemDataService]
})
export class AppComponent{

  title = 'shopping-cart';
  constructor(private itemDataService: ItemDataService) {}

}
