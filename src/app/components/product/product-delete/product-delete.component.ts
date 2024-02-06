import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product!: Product
  id: string | null ="";

  constructor(private route: ActivatedRoute,private router: Router, private productService: ProductService){}

  ngOnInit(): void {
      this.route.paramMap.subscribe((param)=> {this.id = param.get('id')});
      this.productService.readById(this.id!).subscribe((product)=>{
        this.product = product;
      })
  }

  delete(): void{
    this.productService.delete(this.product.id!).subscribe(()=>{
      this.productService.showMessage("Produto deletado com sucesso");
      this.router.navigate(["/products"]);
    })
  }

  cancel(): void{
    this.router.navigate(["/products"]);
  }
}
