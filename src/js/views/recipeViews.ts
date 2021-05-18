import icons from '../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './View';
import Recipe from '../Recipe';
class RecipeView extends View {
  protected static instance: RecipeView;
  protected parentElement = document.querySelector('.recipe') as HTMLElement;

  protected errorMessage =
    'We could not find that recipe. Please try another one!';
  protected message = '';
  private constructor() {
    super();
  }
  public static getInstance(): RecipeView {
    if (!RecipeView.instance) {
      RecipeView.instance = new RecipeView();
    }

    return RecipeView.instance;
  }

  public addHandlerRender(handler: EventListenerOrEventListenerObject) {
    ['hashchange', 'load'].forEach(e => {
      window.addEventListener(e, handler);
    });
  }

  public addHandlerAddBookmark(handler: Function) {
    this.parentElement.addEventListener('click', e => {
      const btn = (e.target as HTMLElement).closest('.btn--bookmarked');
      if (!btn) return;
      handler();
    });
  }
  protected generateMarkup() {
    let data = this.data as Recipe;

    let listIngredientsHTML = data.ingredients.reduce(
      this.generateMarkupIngredients,
      ''
    );

    return `
    <figure class="recipe__fig">
    <img src="${data.image_url}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        data.cooking_time
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      
    </div>
    <button class="btn--round btn--bookmarked">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${listIngredientsHTML}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This data was carefully designed and tested by
      <span class="recipe__publisher">${data.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href=${data.source_url}
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  private generateMarkupIngredients(acc: any, elt: any) {
    return (acc += ` <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
            elt.quantity ? new Fraction(elt.quantity).toString() : ''
          }</div>
          <div class="recipe__description">
            <span class="recipe__unit">${elt.unit}</span>
            ${elt.description}
          </div>
      </li>`);
  }

  public addHandlerUpdateServings(handler: Function) {
    this.parentElement.addEventListener('click', e => {
      const btn = (e.target as HTMLElement).closest('.btn--tiny');
      if (!btn) return;
      if (btn.classList[1] === 'btn--increase-servings') {
        handler(1);
      }
      if (btn.classList[1] === 'btn--decrease-servings') {
        handler(-1);
      }
    });
  }
}

export default RecipeView.getInstance();
