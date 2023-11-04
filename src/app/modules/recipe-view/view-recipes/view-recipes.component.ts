import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RecipeService } from '../../../services/recipe-service/recipe.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewportScroller } from '@angular/common';

export interface PeriodicElement {
  Name: string;
  id: number;
  Quantity: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id:1,Name:'Pizza Sauce',Quantity:'1tspoon'},
  {id:2,Name:'Baby Spinach',Quantity:'1tspoon'},
  {id:3,Name:'Part-Skim Mozzarella',Quantity:'1tspoon'},
  {id:4,Name:'Artichoke',Quantity:'1tspoon'},
  {id:5,Name:'Bell Pepper',Quantity:'1tspoon'},
  {id:6,Name:'Red Onion',Quantity:'1tspoon'},
  {id:7,Name:'Cherry Tomatoes',Quantity:'1tspoon'},

]


@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.css']
})
export class ViewRecipesComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['id', 'Name', 'Quantity'];
  dataSource: any;
  recipeInfo:any;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute, 
              private spinner: NgxSpinnerService,
              private router:Router,
              private viewportScroller: ViewportScroller){
      
  }

 
  ngOnInit():void{
    this.spinner.show();
    const Id = this.route.snapshot.paramMap.get('id');
    this.recipeService.viewRecipe(Id).subscribe((res:any)=>{
      console.log(res);
      this.recipeInfo = res.data
      this.dataSource = this.recipeInfo.ingredients;
      this.spinner.hide();
    
    })

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}


