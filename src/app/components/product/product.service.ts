import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Product } from './product.model';
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  private baseURL: string = "http://localhost:3001/products";

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseURL, product).pipe(
      map(obj =>{ obj }),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage("Ocorreu um erro", true);
    return EMPTY;
  }

  read():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseURL);
  }

  readById(id: string): Observable<Product>{
    const url = `${this.baseURL}/${id}`;
    return this.http.get<Product>(url);
  }

  update(product: Product): Observable<Product>{
    const url = `${this.baseURL}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map(obj =>{ obj }),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Product>{
    const url = `${this.baseURL}/${id}`
    return this.http.delete<Product>(url).pipe(
      map(obj =>{ obj }),
      catchError(e => this.errorHandler(e))
    );
  }

  showMessage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg, 'x',{
      duration: 3000,
      panelClass: isError ? ['msg-error'] : ['msg-success'],
      horizontalPosition: "right",
      verticalPosition:"top"
    })
    
  }
}
