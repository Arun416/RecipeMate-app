import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { DrawerService } from '../../../services/drawerservice/drawer.service';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../../services/authService/auth.service';
import { RecipeService } from '../../../services/recipe-service/recipe.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 3000, noPause: true, showIndicators: true },
    },
  ],
})
export class LayoutComponent  implements OnInit{
  @ViewChild('drawer') drawer!: MatDrawer;
  getRecipesCollection:any;
  currentUserName:any;
  isDrawerOpen$ = this.drawerService.getDrawerState()|| false;

 
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

 
  getUsersRecipes(){
    this.spinner.show();
    this.recipeService.getRecipes().subscribe((res:any)=>{
      console.log(res)
      this.getRecipesCollection = res.data;
     
        this.spinner.hide();

    })
  }

  onSelectRecipe(recpId:string){
    console.log(this.route.snapshot.paramMap.get('id'));
   
    if(this.isUserAuth()){
    this.router.navigate(['/view-recipes/'+recpId]);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

}
