import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { Items } from '../shared/items';
import { RestApiService } from '../shared/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {


  id: number;
  quantity: number;
  constructor(public restApi: RestApiService, public router: Router, private route: ActivatedRoute) { }
  items: any = [];
  ngOnInit() {
    this.loadItems();
  }
  loadItems() {
    return this.restApi.getItems().subscribe((data: {}) => {
      this.items = data;
    })
  }

}

