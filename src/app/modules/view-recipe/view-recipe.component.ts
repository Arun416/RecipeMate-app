import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DrawerService } from 'src/app/services/drawerservice/drawer.service';
import { RecipeService } from 'src/app/services/recipe-service/recipe.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit{
  displayedColumns: string[] = ['id', 'Name', 'Quantity'];
  dataSource: any;
  recipeInfo:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isDrawerOpen$ = this.drawerService.getDrawerState();

  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute, 
              private spinner: NgxSpinnerService,
              private router:Router,
              private viewportScroller: ViewportScroller,
              private drawerService:DrawerService){
      
  }

 
  ngOnInit():void{
    this.spinner.show();
    /*  this.isDrawerOpen$.subscribe((isOpen) => {
      if(isOpen == true){
       this.drawerService.toggleDrawer();
      }
    })  */
    const Id = this.route.snapshot.paramMap.get('id');
    setTimeout(()=>{
      this.recipeService.viewRecipe(Id).subscribe((res:any)=>{
        console.log(res);
        this.recipeInfo = res.data
        this.dataSource = this.recipeInfo.ingredients;
        this.spinner.hide();
      
      })
    },200)
   

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.recipeInfo.ingredients);
    this.dataSource.paginator = this.paginator;
  }
}
