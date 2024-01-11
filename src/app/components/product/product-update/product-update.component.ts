import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product!: Product;
  
  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute){ }
  
  ngOnInit(): void {
   
  }

  cancel(): void{
    this.router.navigate(["/products"]);
  }
}
