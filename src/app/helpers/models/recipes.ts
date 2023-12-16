export class Recipes {
    username!: string;
    profilePic!: string;
    category!: string;
    recipe_name!: string;
    description!: string;
    prep_time!: string;
    ingredients!: Ingredients[];
    preparation_steps!:string;
    servings!:string;
    recipe_image!: string;

}


export class Ingredients {
    ingredient_name!: string;
    quantity!: string;
}