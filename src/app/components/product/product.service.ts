import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  private baseURL: string = "http://localhost:3001/products";

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseURL, product);
  }

  read():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseURL);
  }

  edit(product: Product): Observable<Product[]>{
    return this.http.put<Product[]>(this.baseURL+product.id, product);
  }

  delete(product: Product): Observable<Product>{
    return this.http.delete<Product>(this.baseURL+product.id);
  }

  showMessage(msg: string): void{
    this.snackBar.open(msg, 'x',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition:"top"
    })
    
  }
}
