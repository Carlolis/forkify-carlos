//TODO to implement
import View from './View';
import Recipe from '../Recipe';

class PreviewView extends View {
  generateMarkup() {
    const id = window.location.hash.slice(1);
    let data = this.data as Recipe[];

    return data
      .map((elt: Recipe) => {
        return `<li class="preview">
      <a class="preview__link ${
        this.data.id === id ? 'preview__link--active' : ''
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

export default PreviewView.getInstance();
