import View from './View';

class SearcheView extends View {
  private static instance: SearcheView;
  protected parentElement = document.querySelector(
    '.search'
  ) as HTMLFormElement;

  private constructor() {
    super();
  }
  public static getInstance(): SearcheView {
    if (!SearcheView.instance) {
      SearcheView.instance = new SearcheView();
    }

    return SearcheView.instance;
  }
  public getQuery() {
    const query = (
      this.parentElement.querySelector('.search__field') as HTMLInputElement
    ).value;
    this.parentElement.reset();
    return query;
  }
  public addHandleSearch(handler: Function) {
    this.parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
  protected generateMarkup() {
    return '';
  }
}

export default SearcheView.getInstance();
