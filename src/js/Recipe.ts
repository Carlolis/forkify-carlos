interface Ingredient {
  quantity: number;
  unit: string;
  description: string;
}

export default class Recipe {
  public id: string;
  public title: string;
  public publisher: string;
  public source_url: string;
  public image_url: string;
  public servings: number;
  public cooking_time: number;
  public ingredients: Ingredient[];
  public bookmarked: boolean;
  public key: string;
}

export interface sentRecipe {
  title: string;
  publisher: string;
  source_url: string;
  image_url: string;
  servings: number;
  cooking_time: number;
  ingredients: Ingredient[];
}
