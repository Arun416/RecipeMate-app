import { ViewportScroller } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/authService/auth.service';
import { DrawerService } from 'src/app/services/drawerservice/drawer.service';
import { RecipeService } from 'src/app/services/recipe-service/recipe.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';

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
export class HomeComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  getRecipesCollection:any;
  currentUserName:any;
  isDrawerOpen$ = this.drawerService.getDrawerState()|| false;
  searchName: string = '';
 
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
    this.isDrawerOpen$.subscribe((isOpen) => {
      if (isOpen) {
        this.drawer?.open();
      } else {
        this.drawer?.close();
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll to the top of the page
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
    this.getUsersRecipes();
    this. getCategories();
  }

  isUserAuth(){
    return localStorage.getItem('auth')
  }

  getUsername(){
    if(this.isUserAuth()){
      this.currentUserName = JSON.parse(localStorage.getItem('currentUser')|| '')
      return this.currentUserName;
    }
  }

  categoriesList:any;
  getCategories(){
    this.recipeService.getCatgories().subscribe((res:any)=>{
      this.categoriesList = res.data
    })
  }

  searchcat(cat:any){
    this.recipeService.getSelectedCategory(cat).subscribe((res:any)=>{
       this.getRecipesCollection =res.data
    })
  }

  searchRecipeByName(event:any){
      this.searchName = event;
      console.log(this.searchName)
  }

  
  getUsersRecipes(){
    this.spinner.show();
    if(this.isUserAuth()){
    this.recipeService.getRecipes().subscribe((res:any)=>{
      console.log(res)
      this.getRecipesCollection = res.data;
     
        this.spinner.hide();

    })
  }
  else if(!this.isUserAuth()){
    this.recipeService.getSuggestRecipes().subscribe((res:any)=>{
      this.getRecipesCollection = res.data;
      this.spinner.hide();
    })
  }
  }

  onSelectRecipe(recpId:string){
    console.log(this.route.snapshot.paramMap.get('id'));
    console.log(recpId);
    
    if(this.isUserAuth()){
    this.router.navigateByUrl('view-recipe/'+recpId);
    }
    else{
      this.router.navigateByUrl('/login');
    }
  }
}
