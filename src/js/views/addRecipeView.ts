import View from './View';
import icons from '../../img/icons.svg';
class AddRecipeView extends View {
  private static instance: AddRecipeView;
  protected message = 'Recipe was successfully uploaded !';
  private window = document.querySelector('.add-recipe-window');
  private overlay = document.querySelector('.overlay');
  private btnOpen = document.querySelector('.nav__btn--add-recipe');
  private btnClose = document.querySelector('.btn--close-modal');

  protected parentElement = document.querySelector(
    '.upload'
  ) as HTMLFormElement;

  private constructor() {
    super();
    this.addHandlerWindow();
  }
  protected errorMessage = 'Form error';

  public static getInstance(): AddRecipeView {
    if (!AddRecipeView.instance) {
      AddRecipeView.instance = new AddRecipeView();
    }

    return AddRecipeView.instance;
  }

  public toggleWindow() {
    this.overlay.classList.toggle('hidden');
    this.window.classList.toggle('hidden');
  }
  private addHandlerWindow() {
    this.btnOpen.addEventListener('click', () => {
      this.toggleWindow();
    });
    this.btnClose.addEventListener('click', () => {
      this.toggleWindow();
    });
  }

  public addHandlerUpload(handler: Function) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const data = new FormData(this);

      handler(Object.fromEntries(data.entries()));
    });
  }
  protected generateMarkup() {
    return '';
  }
}

export default AddRecipeView.getInstance();
