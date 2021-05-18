import { plainToClass } from 'class-transformer';
import { API_Url, RESULTS_PER_PAGE, KEY } from './config';
import { AJAX } from './helpers';
import Recipe from './Recipe';
import { sentRecipe } from './Recipe';
/**
 *
 *
 * @author Charles Ilieff
 */
class State {
  protected static instance: State;
  private recipe: Recipe;
  private search: {
    query: string;
    results: Recipe[];
    resultsPerPage: number;
    page: number;
  };
  private key: string;
  private bookmarks: Recipe[];
  private constructor() {
    this.search = {
      query: '',
      results: [],
      resultsPerPage: RESULTS_PER_PAGE,
      page: 1,
    };
    this.bookmarks = [];
  }

  public static getInstance(): State {
    if (!State.instance) {
      State.instance = new State();
    }

    return State.instance;
  }

  public getRecipe() {
    return this.recipe;
  }
  public setRecipe(recipe: Recipe) {
    this.recipe = recipe;
  }
  public getSearch() {
    return this.search;
  }
  public setSearch(results: Recipe[], query: string) {
    this.search = {} as {
      query: string;
      results: Recipe[];
      resultsPerPage: number;
      page: number;
    };
    this.search.results = results;
    this.search.query = query;
    this.search.resultsPerPage = RESULTS_PER_PAGE;
    this.search.page = 1;
  }
  public getBookmarks() {
    return this.bookmarks;
  }

  private persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  };

  public addBookmark = function (recipe: Recipe) {
    this.bookmarks.push(recipe);

    //Mark current recipe as bookmark
    if (recipe.id === this.recipe.id) {
      this.recipe.bookmarked = true;
    }
    this.persistBookmarks();
  };

  public deleteBookmark = function (id: String) {
    const index = this.bookmarks.findIndex((el: Recipe) => el.id === id);
    this.bookmarks.splice(index, 1);

    if (id === this.recipe.id) {
      this.recipe.bookmarked = false;
    }
    this.persistBookmarks();
  };

  public loadRecipe = async function (id: string) {
    try {
      const data = await AJAX(`${API_Url}/${id}?key=${KEY}`);

      const recipeJson = data.data.recipe;

      this.setRecipe(plainToClass(Recipe, recipeJson as Recipe));

      if (this.getBookmarks().some((recipeB: Recipe) => recipeB.id === id)) {
        this.recipe.bookmarked = true;
      } else {
        this.recipe.bookmarked = false;
      }
    } catch (err) {
      throw err;
    }
  };
  public loadSearchResults = async function (query: string) {
    try {
      const { data } = await AJAX(`${API_Url}?search=${query}&key=${KEY}`);

      this.setSearch(plainToClass(Recipe, data.recipes as Object[]), query);
    } catch (err) {
      throw err;
    }
  };

  public paginationControl = function (page: number) {
    this.getSearch().page += page;
  };

  public getSearchResultsPage = function (
    page: number = this.getSearch().page
  ) {
    this.getSearch().page = page;
    const start = (page - 1) * this.getSearch().resultsPerPage;
    const end = page * this.getSearch().resultsPerPage;
    return this.getSearch().results.slice(start, end);
  };
  public updateServings = function (servings: number) {
    if (servings === -1 && this.getRecipe().servings === 1) return;
    const newServings = this.getRecipe().servings + servings;
    this.getRecipe().ingredients = this.getRecipe().ingredients.map(
      (ing: any) => {
        ing.quantity = (ing.quantity * newServings) / this.getRecipe().servings;
        return ing;
      }
    );
    this.getRecipe().servings = newServings;
  };
  public init = function () {
    const storage = localStorage.getItem('bookmarks');

    if (storage) this.bookmarks = JSON.parse(storage);
  };
  public uploadRecipe = async function (newRecipe: any) {
    try {
      const ingredients = Object.entries<string>(newRecipe)
        .filter(entry => {
          return entry[0].startsWith('ingredient') && entry[1] !== '';
        })
        .map(ing => {
          const ingArr = ing[1].split(',').map(elm => elm.trim());
          if (ingArr.length !== 3)
            throw new Error(
              'Wrong ingredient format ! Please use the correct format:)'
            );

          const [quantity, unit, description] = ingArr;

          return { quantity: quantity ? +quantity : null, unit, description };
        });
      console.log(newRecipe);
      const recipe: sentRecipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
      };

      const { data } = await AJAX(`${API_Url}?key=${KEY}`, recipe);
      console.log(data.recipe);
      this.setRecipe(plainToClass(Recipe, data.recipe as Recipe));
      this.createKey(KEY);
      this.addBookmark(this.recipe);
    } catch (err) {
      throw err;
    }
  };
  private createKey(key: string) {
    this.key = key;
  }
}

export default State.getInstance();
