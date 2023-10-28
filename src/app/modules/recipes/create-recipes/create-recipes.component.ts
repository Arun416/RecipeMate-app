import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recipes',
  templateUrl: './create-recipes.component.html',
  styleUrls: ['./create-recipes.component.css']
})
export class CreateRecipesComponent implements OnInit{
  productsList = ['Prod1', 'Prod2', 'Prod3', 'Prod4', 'Prod5', 'Prod6'];
  products = new FormControl();
  productsToReturn:any = [];
  containers:any = [];
  createRecipe!:FormGroup;
  currentUserName:any;
  categoriesList:any;

  constructor(
    private fb:FormBuilder,
    private recipeService:RecipeService,
    private router: Router) {}

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
      this.currentUserName = JSON.parse(localStorage.getItem('currentUser')|| '')
      return this.currentUserName;
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


  selectedImage: string = ''; // To display the selected image URL

  recipeImageFile!:File;
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
   
    const formData = new FormData();
    formData.append('username', this.getUsername().username);
    formData.append('profilePic','');
    formData.append('recipe_name', this.createRecipe.value.recipe_name);
    formData.append('description', this.createRecipe.value.description);
    formData.append('servings', this.createRecipe.value.servings);
    formData.append('category', JSON.stringify(this.createRecipe.value.category)); 
    formData.append('prep_time',this.createRecipe.value.prep_time); 
    formData.append(`ingredients`,JSON.stringify(this.createRecipe.value.ingredients));
    formData.append('preparation_steps', JSON.stringify(this.createRecipe.value.preparation_steps) )
    formData.append('recipe_image', this.recipeImageFile);


    this.recipeService.createRecipes(formData).subscribe((res:any)=>{
        console.log(res);
        alert(res.message);
        this.router.navigate(['/my-recipes'])
      })
  }


  
  
}
