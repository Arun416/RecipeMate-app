import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/authService/auth.service';
import { DrawerService } from 'src/app/services/drawerservice/drawer.service';
import { RecipeService } from 'src/app/services/recipe-service/recipe.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import * as moment from 'moment';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 3000, noPause: true, showIndicators: true },
    },
  ],
})
export class HomeComponent implements OnInit,OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  getRecipesCollection:any;
  currentUserName:any;
  isDrawerOpen$ = this.drawerService.getDrawerState();
  public pagination:number = 1;
  public totalRecords = 0 ;
  public pageSizes = [20,40,80];
  public isItemsPerPage = 20;
  reverse:boolean = false;
  sortOrder: 'asc' | 'desc' = 'asc';
  searchTerm:string = "";
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 300;
  totalRecipes:any;
  categoriesList:any;
  toggleCategory:boolean = false;
  dataAgo:any[]=[];
  isUserAuth:any;
  sortList = [
    {name:'A->Z(asc)',value:"asc"},
    {name:'Z->A(desc)',value:"desc"}
  ]
  constructor(private drawerService: DrawerService,
    private breakpointObserver: BreakpointObserver,
    private authService:AuthService,
    private recipeService:RecipeService,
    private router:Router,
    private spinner: NgxSpinnerService,
    private route:ActivatedRoute,
    private viewportScroller: ViewportScroller) {
  
  }


  // You can optionally subscribe to the drawer state and control it manually.
  ngOnInit() {
     this.isUserAuth =  localStorage.getItem('auth')
    setTimeout(()=>{
      this.isDrawerOpen$.subscribe((isOpen:any) => {
        if (isOpen) {
          this.drawer?.open();
        } else {
          this.drawer?.close();
        }
      });
    },500)
  
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
    this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {
      this.onSearch(searchValue);
    });
    this.getUsersRecipes();
    this.getCategories();
  }

/*   isUserAuth(){
    return localStorage.getItem('auth')
  } */

  getUsername(){
    if(this.isUserAuth){
      this.currentUserName = JSON.parse(localStorage.getItem('currentUser')|| '')
      return this.currentUserName;
    }
  }

  getAuthToken(){
    let user:any  = this.authService.getCurrentUser();
    let jwt = user.source._value.token
    return jwt;
  }

 
  getCategories(){
      if(this.isUserAuth){
        this.recipeService.getCatgories().subscribe((res:any)=>{
          this.categoriesList = res.data
        })
        }
        else if(!this.isUserAuth){
        this.recipeService.getHomeCatgories().subscribe((res:any)=>{
          this.categoriesList = res.data
        })
        }
  }

 
  searchcat(cat:any){
    this.toggleCategory = !this.toggleCategory
    if(this.isUserAuth){
    cat = this.toggleCategory==true?cat:"";
    this.recipeService.getSelectedCategory(cat).subscribe((res:any)=>{
       this.getRecipesCollection  = res.data.recipeList;
    })
    }
    else if(!this.isUserAuth){
      cat = this.toggleCategory==true?cat:"";
      this.recipeService.getHomeCategory(cat).subscribe((res:any)=>{
        this.getRecipesCollection  = res.data.recipeList;
     })
    }
  }

  searchRecipeByName(event:any){
      this.searchTerm = event;
      console.log(this.searchTerm)
      this.getUsersRecipes();
  }

  onSearch(searchValue: string) {
    this.searchSubject.next(searchValue);
  }


  ngOnDestroy() {
    this.searchSubject.complete();
  }

  getUsersRecipes(){
    this.spinner.show();
      if(this.isUserAuth){
        this.recipeService.getRecipes(this.pagination,
          this.isItemsPerPage,
          'recipe_name',
          this.sortOrder,
          this.searchTerm,
          this.getAuthToken()
          ).subscribe((res:any)=>{
          console.log(res)
          this.getRecipesCollection = res.data.recipeList;
          this.totalRecipes = res.data.total;
          this.spinner.hide();
        })
      }
      else if(!this.isUserAuth){
        this.recipeService.getSuggestRecipes(this.pagination,
          this.isItemsPerPage,
          'recipe_name',
          this.sortOrder,
          this.searchTerm).subscribe((res:any)=>{
          this.getRecipesCollection = res.data.recipeList;
          this.spinner.hide();
        })
      }
  }

  onSelectRecipe(recpId:string){
    
    if(this.isUserAuth){
    this.router.navigateByUrl('view-recipe/'+recpId);
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }

  onSort(e:any){
    console.log(e.target.value);
    
    this.sortOrder = e.target.value;
    this.getUsersRecipes();
  }
  
  onTablePageChange(page: any){    
    this.pagination = page
    this.getUsersRecipes();
  }

  onTableSizesChange (event:any): void{
    this.isItemsPerPage = event.target.value;
    this.pagination = 1;
    this.getUsersRecipes();
}
}
