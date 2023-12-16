import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';
import { DrawerService } from 'src/app/services/drawerservice/drawer.service';
import { RecipeService } from 'src/app/services/recipe-service/recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  productsToReturn:any = [];
  containers:any = [];
  EditRecipeFormGroup!:FormGroup;
  currentUserName:any;
  categoriesList:any;
  selectedImage: string = ''; 
  recipeImageFile!:File;
  recipeData:any;
  recipe_ID!:any;
  imgFlag:boolean = false;
  plaeholderImage:any;
  isDrawerOpen$ = this.drawerService.getDrawerState();

  constructor(
    private fb:FormBuilder,
    private recipeService:RecipeService,
    private router: Router,
    private toastr: ToastrService,
    private route:ActivatedRoute,
    private spinner: NgxSpinnerService,
    private drawerService:DrawerService,
    private authService:AuthService) {}


 
  ngOnInit(): void {
  /*   this.isDrawerOpen$.subscribe((isOpen) => {
      if(isOpen == true){
       this.drawerService.toggleDrawer();
      }
    })  */
    this.plaeholderImage = "assets/images/recipes_placeholder.png"
    this.EditRecipeFormGroup = this.fb.group({
      recipe_name :[null],
      description :[''],
      servings :[''],
      recipe_image :[null],
      category :[this.productsToReturn],
      prep_time:[''],
      ingredients : this.fb.array([]),
      preparation_steps :this.fb.array([]),
    })
    this.recipe_ID = this.route.snapshot.paramMap.get('id');
    this.getCategories();
    this.getRecipeData();
  }

  
  async getRecipeData(){
    this.spinner.show();

    try{
      const res: any = await this.recipeService.viewRecipe(this.recipe_ID).toPromise();

      this.spinner.hide()
          this.recipeData = res.data;
          console.log(this.recipeData,"info");
          
          this.EditRecipeFormGroup.patchValue({
            recipe_name : this.recipeData.recipe_name,
            description : this.recipeData.description,
            servings : this.recipeData.servings,
            category : this.recipeData.category,
            prep_time:this.recipeData.prep_time,
            recipe_image: this.recipeData.recipe_image
          })
      // this.setIngrediets(this.recipeData)
  
  }
  catch(err){
    console.error(err);
  }
  

  this.doSomethingWithRecipeData();
  this.existingPreperationSteps();
}


doSomethingWithRecipeData() {
  // Access recipeData here
  let control = <FormArray>this.EditRecipeFormGroup.controls['ingredients'];  
  this.recipeData.ingredients.forEach((x:any)=> {
    control.push(this.fb.group({
      ingredient_name: x.ingredient_name,
      quantity: x.quantity,
    }));
  })
}

existingPreperationSteps(){
  let control = <FormArray>this.EditRecipeFormGroup.controls['preparation_steps'];
  
  this.recipeData.preparation_steps.forEach((x:any)=> {
    control.push(this.fb.control(x));
  })
}

  isUserAuth(){
    return localStorage.getItem('auth')
  }

 
  getUsername(){
    if(this.isUserAuth()){
      this.currentUserName = this.authService.getCurrentUser();
      return this.currentUserName.source._value.username;
    }
  }

  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    
    this.imgFlag = true;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
    
      this.recipeImageFile = file
      console.log(this.recipeImageFile,"image data");
      
      if (file) {
        // Read the selected image and set it to the selectedImage property
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImage = e.target.result;
          this.EditRecipeFormGroup.patchValue({
            recipe_image: this.recipeImageFile
          });

          this.EditRecipeFormGroup.get('recipe_image')?.updateValueAndValidity();

        };
        reader.readAsDataURL(file);
      }
    }
  }

  
  getCategories(){
    this.recipeService.getCatgories().subscribe((res:any)=>{
      this.categoriesList = res.data
    })
  }

  onSelectCategory(e:any){
    this.productsToReturn.push(e.target.value);

  }

  createItem(): FormControl {
    return this.fb.control('');
  }

   newIngredientsFormGroup(): FormGroup {
    return this.fb.group({
      ingredient_name: "",
      quantity: "",
    })
  } 

  get ingredientsControl() {
    return (this.EditRecipeFormGroup.get("ingredients") as FormArray).controls
  }

  get prepStepsControl(): FormArray {
    return this.EditRecipeFormGroup.get("preparation_steps") as FormArray
  }

  addIngredients() {
     (this.EditRecipeFormGroup.get('ingredients')as FormArray).push(this.newIngredientsFormGroup());
  }

  removeIngredients(Index: number) {
    (<FormArray>this.EditRecipeFormGroup.get('ingredients')).removeAt(Index);
  } 


  addSteps(): void {
    const items = this.EditRecipeFormGroup.get('preparation_steps') as FormArray;
    items.push(new FormControl(''));
  }

  removeSteps(index: number): void {
    const items = this.EditRecipeFormGroup.get('preparation_steps') as FormArray;
    items.removeAt(index);
  }


  fillProductsToReturn(product: string){
    if(!this.productsToReturn.includes(this.EditRecipeFormGroup.get('category')?.value)){
      this.productsToReturn.push(this.EditRecipeFormGroup.get('category')?.value);
    }
    
  }

 

  onSubmit(form:any){
   console.log(form,"Snd Form");

    const formData = new FormData();
    formData.append('username', this.getUsername());
    formData.append('profilePic',this.recipeData.profilePic);
    formData.append('category', JSON.stringify(this.EditRecipeFormGroup.value.category)); 
    formData.append('recipe_name',this.EditRecipeFormGroup.value.recipe_name);
    formData.append('description', this.EditRecipeFormGroup.value.description);
    formData.append('prep_time', this.EditRecipeFormGroup.value.prep_time); 
    formData.append(`ingredients`, JSON.stringify(this.EditRecipeFormGroup.value.ingredients));
    formData.append('preparation_steps',  JSON.stringify(this.EditRecipeFormGroup.value.preparation_steps))
    formData.append('servings', this.EditRecipeFormGroup.value.servings);
    formData.append('recipe_image',this.EditRecipeFormGroup.value.recipe_image);
    console.log(form);
    

    this.recipeService.editRecipes(formData,this.recipe_ID).subscribe((res:any)=>{
        console.log(res);
        this.toastr.success('Recipe Updated Successfully!', 'Success',{
          timeOut: 2000,
        });
        this.router.navigateByUrl('/my-recipe')
   }) 
}
}
