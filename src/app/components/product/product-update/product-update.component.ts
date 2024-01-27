import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../product.model';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit, OnChanges, DoCheck,AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy{

  
  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute){ }
  product!: Product;
  
  @Input() initialValue: any = 10
  limite10: boolean = false;
  
  id: string | null  =""

  ngOnChanges(): void{
    this.log("ngOnChange");
  }
  ngOnInit(): void {
    //A aplicação teria que esperar o objeto product ser preenchido como em async await
    //Ver como funciona o ngAfterInit

  // const id = this.route.snapshot.paramMap.get('id')!;
   this.route.paramMap.subscribe((param)=>{ this.id = param.get("id")})
   this.productService.readById(this.id!).subscribe((product)=>{
    this.product = product;
    this.log("ngOnInit")
    //----
    this.route.paramMap.subscribe(params =>{
      this.initialValue = params.get('initialValue')!;
    })
   })
  }

  ngDoCheck():void{
    this.log("ngDoCheck");
  }

  ngAfterContentInit(): void{
    this.log("ngAfterContentInit")
  }

  ngAfterContentChecked(): void{
    this.log("ngAfterContentChecked")
  }

  ngAfterViewChecked(): void{
    this.log("ngAfterViewChecked")
  }

  ngOnDestroy(): void{
    this.log("ngOnDestroy")
  }

  incremento(): void{
    if(this.initialValue == 15){
      this.limite10 = true;
    }
    this.initialValue++
  }

  updateProduct():void{
    this.productService.update(this.product).subscribe(()=>{
      this.productService.showMessage("Produto Atualizado com sucesso");
      this.router.navigate(["/products"]);
    })
  }

  cancel(): void{
    this.router.navigate(["/products"]);
  }

  log(hook: string): void{
    console.log(hook);
    
  }
}
