import View from './View';
import Recipe from '../Recipe';

class ResultsView extends View {
  protected static instance: ResultsView;
  protected parentElement = document.querySelector('.results') as HTMLElement;
  private constructor() {
    super();
  }
  protected errorMessage =
    'We could not find any recipes. Please try another word! (Pizza ?)';
  public static getInstance(): ResultsView {
    if (!ResultsView.instance) {
      ResultsView.instance = new ResultsView();
    }

    return ResultsView.instance;
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

export default ResultsView.getInstance();
