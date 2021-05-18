import View from './View';
import icons from '../../img/icons.svg';
class PaginationView extends View {
  protected static instance: PaginationView;

  protected parentElement = document.querySelector(
    '.pagination'
  ) as HTMLElement;

  private constructor() {
    super();
    this.data = 1;
  }
  protected errorMessage = 'Pagination error';

  public static getInstance(): PaginationView {
    if (!PaginationView.instance) {
      PaginationView.instance = new PaginationView();
    }

    return PaginationView.instance;
  }

  protected generateMarkup() {
    //Page 1, and there are not other pages
    if (
      this.data.page === 1 &&
      this.data.results.length < this.data.resultsPerPage
    ) {
      this.generatMarkup = '';
    }
    //Page 1, and there are other pages
    if (
      this.data.page === 1 &&
      this.data.results.length > this.data.resultsPerPage
    ) {
      return `<button class="btn--inline pagination__btn--next">
      <span>Page ${<number>this.data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    //Page 2, and there are other pages
    if (
      this.data.page > 1 &&
      this.data.results.length -
        (this.data.page - 1) * this.data.resultsPerPage >
        this.data.resultsPerPage
    ) {
      return `<button class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${<number>this.data.page - 1}</span>
            </button>
            <button class="btn--inline pagination__btn--next">
              <span>Page ${<number>this.data.page + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>`;
    }

    //Final Page
    if (
      this.data.page > 1 &&
      this.data.results.length -
        (this.data.page - 1) * this.data.resultsPerPage <
        this.data.resultsPerPage
    ) {
      return `<button class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${<number>this.data.page - 1}</span>
            </button>
            `;
    }
  }

  public addHandlePagination(handler: Function) {
    this.parentElement.addEventListener('click', e => {
      const btn = (e.target as HTMLElement).closest('.btn--inline');
      this.generateMarkup();
      if (
        btn.closest('.btn--inline').classList[1] === 'pagination__btn--next'
      ) {
        handler(1);
      }
      if (
        btn.closest('.btn--inline').classList[1] === 'pagination__btn--prev'
      ) {
        handler(-1);
      }
    });
  }
}

export default PaginationView.getInstance();
