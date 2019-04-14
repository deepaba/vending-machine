import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../shared/rest-api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  data: { id: number, name: string, quantity: number, price: number };
  itemId: number;
  itemQuantity: number;
  QuantityLeft: number;
  ngOnInit() {
    this.data = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
      quantity: this.route.snapshot.params['quantity'],
      price: this.route.snapshot.params['price']
    };
    
  }
  constructor(private route: ActivatedRoute, public restApi:RestApiService, public router: Router) { }
  onClickOk() {
    this.addShoppingListItem();
    this.updateQuantity();
  }

  updateQuantity() {
    this.QuantityLeft = this.data.quantity - this.itemQuantity
    return this.restApi.updateItems(this.data.id, { id: this.data.id, name: this.data.name, quantity: this.QuantityLeft, price: this.data.price }).subscribe(data => {
      this.router.navigate(['/'])
    })

  }
  addShoppingListItem() {
    return this.restApi.addToShoppingList({ id: this.data.id, name: this.data.name, quantity: this.itemQuantity, price: this.data.price * this.itemQuantity}).subscribe(data => { })
  }
}
