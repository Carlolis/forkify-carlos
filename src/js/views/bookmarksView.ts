import View from './View';
import Recipe from '../Recipe';

class bookmarksView extends View {
  protected static instance: bookmarksView;
  protected parentElement = document.querySelector(
    '.bookmarks__list'
  ) as HTMLElement;
  private constructor() {
    super();
  }
  protected errorMessage =
    'No bookmarks yet. Find a nice recipe and bookmark it. ;)';
  public static getInstance(): bookmarksView {
    if (!bookmarksView.instance) {
      bookmarksView.instance = new bookmarksView();
    }

    return bookmarksView.instance;
  }

  addHandlerRender(handler: EventListenerOrEventListenerObject) {
    window.addEventListener('load', handler);
  }
  generateMarkup() {
    const id = window.location.hash.slice(1);
    let data = this.data as Recipe[];

    return data
      .map((elt: Recipe) => {
        return `<li class="preview">
      <a class="preview__link ${
        elt.id === id ? 'preview__link--active' : ''
      } " href="#${elt.id}">
        <figure class="preview__fig">
          <img src="${elt.image_url}" alt="${elt.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${elt.title}</h4>
          <p class="preview__publisher">${elt.publisher}</p>  
        </div>  
      </a>
    </li>`;
      })
      .join('');
  }
}

export default bookmarksView.getInstance();
