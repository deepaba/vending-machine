import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-checkout',
  templateUrl: './customer-checkout.component.html',
  styleUrls: ['./customer-checkout.component.css']
})
export class CustomerCheckoutComponent implements OnInit {
  totalBill = 0;
  amountEntered: number;
  shoppingList: any = [];
  visible = true;
  constructor(public restApi: RestApiService, public router: Router) { }

  ngOnInit() {
    this.loadBillAmount();
  }
  loadBillAmount() {
    return this.restApi.getShoppingList().subscribe((data: {}) => {
      this.shoppingList = data;
      for (let i of this.shoppingList) {
        this.totalBill = this.totalBill + i.price;
      }
    })
  }
  onClickPay() {
    this.visible = false;
  }
  onCheckout() {
    if ((this.amountEntered - this.totalBill) >= 0) {
      if (!confirm("Would you like to continue shopping?")) {
        alert("Thank you for shopping with us. Please collect your change");
        this.totalBill = 0;
        this.visible = true;
        this.deleteAllList();
      }
      this.router.navigate(['/']);

    } else {
      alert("Amount entered is less than total bill amount!");
    }
  }
  deleteAllList() {
    for (let item of this.shoppingList) {
      this.restApi.deleteShoppingList(item.id).subscribe(data => {
        
      })
    }
  }

}
