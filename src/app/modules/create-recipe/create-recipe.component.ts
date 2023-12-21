import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/authService/auth.service';
import { RecipeService } from 'src/app/services/recipe-service/recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent  implements OnInit{
  productsList = ['Prod1', 'Prod2', 'Prod3', 'Prod4', 'Prod5', 'Prod6'];
  products = new FormControl();
  productsToReturn:any = [];
  containers:any = [];
  createRecipe!:FormGroup;
  currentUserName:any;
  categoriesList:any;
  selectedImage: string = ''; 
  recipeImageFile!:File;
  loading:boolean = false;

  constructor(
    private fb:FormBuilder,
    private recipeService:RecipeService,
    private authService:AuthService,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.createRecipe = this.fb.group({
      recipe_name :[''],
      description :[''],
      servings :[''],
      recipe_image :[null],
      category :[this.productsToReturn],
      prep_time:[''],
      ingredients : this.fb.array([
        this.fb.group({
          ingredient_name: '',
          quantity: '',
        })
      ]),
      preparation_steps :this.fb.array([
        this.createItem()
      ]),
    })

    this.getCategories();
  }


  isUserAuth(){
    return localStorage.getItem('auth')
  }

 
  getUsername(){
    if(this.isUserAuth()){
      this.currentUserName = this.authService.getCurrentUser();
      console.log(this.currentUserName.source._value.username)
      return this.currentUserName.source._value.username;
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

  newIngredients(): FormGroup {
    return this.fb.group({
      ingredient_name: '',
      quantity: '',
    })
  }

  get ingredientsControl(): FormArray {
    return this.createRecipe.get("ingredients") as FormArray
  }

  get prepStepsControl(): FormArray {
    return this.createRecipe.get("preparation_steps") as FormArray
  }

  addIngredients() {
     (<FormArray>this.createRecipe.get('ingredients')).push(this.newIngredients());
  }

   removeIngredients(Index: number) {
    (<FormArray>this.createRecipe.get('ingredients')).removeAt(Index);
  } 


  addSteps(): void {
    const items = this.createRecipe.get('preparation_steps') as FormArray;
    items.push(new FormControl(''));
  }

  removeSteps(index: number): void {
    const items = this.createRecipe.get('preparation_steps') as FormArray;
    items.removeAt(index);
  }


  fillProductsToReturn(product: string){
    if(!this.productsToReturn.includes(this.createRecipe.get('category')?.value)){
      this.productsToReturn.push(this.createRecipe.get('category')?.value);
    }
  }

  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
    
      this.recipeImageFile = file
    
      console.log(this.recipeImageFile,"image data");
      
      if (file) {
        // Read the selected image and set it to the selectedImage property
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit(form:any){
    this.loading = true
    const formData:any = new FormData();
    formData.append('username', this.getUsername());
    formData.append('profilePic','');
    formData.append('category', JSON.stringify(this.createRecipe.value.category)); 
    formData.append('recipe_name', this.createRecipe.value.recipe_name);
    formData.append('description', this.createRecipe.value.description);
    formData.append('prep_time',this.createRecipe.value.prep_time); 
    formData.append('servings', this.createRecipe.value.servings);
    formData.append(`ingredients`,JSON.stringify(this.createRecipe.value.ingredients));
    formData.append('preparation_steps', JSON.stringify(this.createRecipe.value.preparation_steps) )
    formData.append('recipe_image', this.recipeImageFile);

    console.log(this.createRecipe.value);
    this.recipeService.createRecipes(formData).subscribe((res:any)=>{
        
        console.log(res);
        this.toastr.success('Recipe Created Successfully!', 'Success',{
          timeOut: 2000,
        });
        this.loading = false
        this.router.navigate(['/my-recipe'])
      })
  }
}
