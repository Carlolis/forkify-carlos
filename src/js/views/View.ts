import icons from '../../img/icons.svg';

export default abstract class View {
  protected data: any;
  protected parentElement: HTMLElement;
  protected generatMarkup: string;
  protected errorMessage: string;
  protected message: string;

  protected constructor() {}

  public static getInstance(): void | View {}
  protected abstract generateMarkup(): string;

  public render(data: Object | Object[], render: boolean = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this.data = data;

    this.generatMarkup = this.generateMarkup();
    if (!render) return this.generatMarkup;
    this.clear();

    this.parentElement.insertAdjacentHTML('afterbegin', this.generatMarkup);
  }

  private clear() {
    this.parentElement.textContent = '';
  }

  public renderSpinner() {
    const markUp = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this.parentElement.textContent = '';
    this.parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  public renderError(message: string = this.errorMessage) {
    // this.clear();
    const markUp = `
  <div class="error">
  <div>
    <svg>
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
  </div>
  <p>${message}</p>
 </div>`;
    this.clear();

    this.parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  public renderMessage(message: string = this.message) {
    this.clear();
    const markUp = `
    <div class="recipe">
    <div class="message">
      <div>
        <svg>
          <use href="src/img/icons.svg#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this.clear();

    this.parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  public update(data: any) {
    this.data = data;

    const newMarkup = this.generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElement = Array.from(this.parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      if (
        !curElement[i].isEqualNode(newEl) &&
        curElement[i].firstChild?.nodeValue.trim() !== ''
      ) {
        curElement[i].textContent = newEl.textContent;
      }

      if (!curElement[i].isEqualNode(newEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curElement[i].setAttribute(attr.name, attr.value)
        );
      }
    });
  }
}
