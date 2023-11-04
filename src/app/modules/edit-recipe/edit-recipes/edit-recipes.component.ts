import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RecipeService } from '../../../services/recipe-service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs';



@Component({
  selector: 'app-edit-recipes',
  templateUrl: './edit-recipes.component.html',
  styleUrls: ['./edit-recipes.component.css']
})
export class EditRecipesComponent {
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

  constructor(
    private fb:FormBuilder,
    private recipeService:RecipeService,
    private router: Router,
    private toastr: ToastrService,
    private route:ActivatedRoute,
    private spinner: NgxSpinnerService,) {}


 
  ngOnInit(): void {
    this.recipe_ID = this.route.snapshot.paramMap.get('id');
    this.plaeholderImage = "assets/images/recipes_placeholder.png"
    this.EditRecipeFormGroup = this.fb.group({
      recipe_name :[''],
      description :[''],
      servings :[''],
      recipe_image :[null],
      category :[this.productsToReturn],
      prep_time:[''],
      ingredients : this.fb.array([]),
      preparation_steps :this.fb.array([]),
    })

    this.getCategories();
    this.getRecipeData();
  }

  
  async  getRecipeData(){
    this.spinner.show();

    try{
      const res: any = await this.recipeService.viewRecipe(this.recipe_ID).toPromise();

      this.spinner.hide()
          this.recipeData = res.data
          this.EditRecipeFormGroup.patchValue({
            recipe_name : this.recipeData.recipe_name,
            description : this.recipeData.description,
            recipe_image : this.recipeData.recipe_image,
            servings : this.recipeData.servings,
            category : this.recipeData.category,
            prep_time:this.recipeData.prep_time,

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
  console.log(this.recipeData, "outside subscribe");
  let control = <FormArray>this.EditRecipeFormGroup.controls['ingredients'];
  console.log(this.recipeData.ingredients,"ing");
  
  this.recipeData.ingredients.forEach((x:any)=> {
    control.push(this.fb.group({
      ingredient_name: x.ingredient_name,
      quantity: x.quantity,
    }));
  })
}

existingPreperationSteps(){
  let control = <FormArray>this.EditRecipeFormGroup.controls['preparation_steps'];
  console.log(this.recipeData.preparation_steps,"preparation_steps");
  
  this.recipeData.preparation_steps.forEach((x:any)=> {
    control.push(this.fb.control(x));
  })
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

   newIngredientsFormGroup(): FormGroup {
    return this.fb.group({
      ingredient_name: '',
      quantity: '',
    })
  } 

  get ingredientsControl() {
    return (this.EditRecipeFormGroup.get("ingredients") as FormArray).controls
  }

  get prepStepsControl(): FormArray {
    return this.EditRecipeFormGroup.get("preparation_steps") as FormArray
  }

  addIngredients() {
     (<FormArray>this.EditRecipeFormGroup.get('ingredients')).push(this.newIngredientsFormGroup);
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

  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    
    this.imgFlag = true
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
   console.log(form,"Snd Form");
   
    const formData = new FormData();
    formData.append('username', this.getUsername().username);
    formData.append('profilePic','');
    formData.append('recipe_name', this.EditRecipeFormGroup.value.recipe_name);
    formData.append('description', this.EditRecipeFormGroup.value.description);
    formData.append('servings', this.EditRecipeFormGroup.value.servings);
    formData.append('category', JSON.stringify(this.EditRecipeFormGroup.value.category)); 
    formData.append('prep_time',this.EditRecipeFormGroup.value.prep_time); 
    formData.append(`ingredients`,JSON.stringify(this.EditRecipeFormGroup.value.ingredients));
    formData.append('preparation_steps', JSON.stringify(this.EditRecipeFormGroup.value.preparation_steps) )
    formData.append('recipe_image', this.EditRecipeFormGroup.value.recipe_image);


    this.recipeService.editRecipes(formData,this.recipe_ID).subscribe((res:any)=>{
        console.log(res);
        this.toastr.success('Recipe Updated Successfully!', 'Success',{
          timeOut: 2000,
        });
        this.router.navigate(['/my-recipes'])
   }) 
}

}