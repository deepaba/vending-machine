import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { shoppingItems } from '../shared/shoppingList';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList: any = [];
  total=0;
  constructor(public restApi: RestApiService) { }

  ngOnInit() {
    this.loadShoppingList();
  }
  loadShoppingList() {
    return this.restApi.getShoppingList().subscribe((data: {}) => {
      this.shoppingList = data;
      for (let item of this.shoppingList){
        this.total = this.total + item.price; 
      }
    })
  }
}
