import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Items } from '../shared/items';
import { shoppingItems } from '../shared/shoppingList';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://localhost:3000';
  shoppingListURL = 'http://localhost:3004';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //method to retrieve items from items.JSON file
  getItems(): Observable<Items> {
    return this.http.get<Items>(this.apiURL + '/items').pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  
  //method to add items from shoppingList.JSON file
  addToShoppingList(itemData): Observable<shoppingItems> {
    return this.http.post<shoppingItems>(this.shoppingListURL + '/shoppingItems', JSON.stringify(itemData),this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //method to update item quantity
  updateItems(id, itemData): Observable<Items> {
    return this.http.put<Items>(this.apiURL + '/items/' + id, JSON.stringify(itemData), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  //method to retrieve items from shoppingList.JSON file
  getShoppingList(): Observable<shoppingItems> {
    return this.http.get<shoppingItems>(this.shoppingListURL + '/shoppingItems').pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //method to delete all items from shoppingList.JSON file
  deleteShoppingList(id): Observable<shoppingItems> {
    return this.http.delete<shoppingItems>(this.shoppingListURL + '/shoppingItems/'+id, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
