import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { CustomerCheckoutComponent } from './customer-checkout/customer-checkout.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './item-list/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const appRoutes: Routes = [
  { path: "", component: ItemListComponent },
  { path: "shoppingList", component: ShoppingListComponent },
  { path: "dialog/:id/:name/:quantity/:price", component: ModalComponent },
  { path: "checkout", component: CustomerCheckoutComponent },
  { path: ":id/:quantity", component: ItemListComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ShoppingListComponent,
    CustomerCheckoutComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
