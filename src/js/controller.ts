import state from './model';

import 'reflect-metadata';

import 'core-js/stable';
import 'regenerator-runtime';
import recipeView from './views/recipeViews';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';

// if (module.hot) {
//   module.hot.accept();
// }
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.substr(1);

    if (!id) return;
    recipeView.renderSpinner();

    //0) Update results view to mark selected search result
    resultsView.update(state.getSearchResultsPage());
    bookmarksView.update(state.getBookmarks());

    //1. Loading recipe
    await state.loadRecipe(id);

    //2. Rendering recipe

    recipeView.render(state.getRecipe());
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load search results
    await state.loadSearchResults(query);

    //3) Render results
    resultsView.render(state.getSearchResultsPage());

    //4) Render inital paginations buttons
    paginationView.render(state.getSearch());
  } catch (err) {
    resultsView.renderError();
    console.log(err);
  }
};

const controlServings = function (serving: number) {
  //Update the recipe servings (in state)
  state.updateServings(serving);
  //Update Rendering recipe
  recipeView.update(state.getRecipe());
};

const controlPagination = function (page: number) {
  state.paginationControl(page);
  resultsView.render(state.getSearchResultsPage(state.getSearch().page));
  paginationView.render(state.getSearch());
};

const controlBookmark = function () {
  //1) Add/remove bookmark
  if (!state.getRecipe().bookmarked) {
    state.addBookmark(state.getRecipe());
  } else {
    state.deleteBookmark(state.getRecipe().id);
  }
  //2) Update recipe view
  recipeView.update(state.getRecipe());

  //3) Render bookmarks
  bookmarksView.render(state.getBookmarks());
};

const controlBookmarks = function () {
  state.init();
  bookmarksView.render(state.getBookmarks());
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandleSearch(controlSearchResults);
  paginationView.addHandlePagination(controlPagination);
};
init();
