import success from 'url:../../../resources/gif/success.gif';
import spinner from 'url:../../../resources/svg/icons.svg';
import wrong from 'url:../../../resources/gif/wrong.gif';

export class Views {
  constructor() {
    this._model = document.querySelector('.model');
    this._category = [
      'Home & Living',
      'Food & Beverages',
      'Mobile & Computers',
      'Car & Bike Care',
      'Backpack & Luggages',
    ];
  }

  // Method to show Success Message
  successMessage(msg = this._msg) {
    this._model.querySelector(
      '.model--box'
    ).innerHTML = `<div class="spinner flex ">
          <img src='${success}' >
          ${msg}...
        </div>`;

    this._model.classList.remove('hidden');
    setTimeout(() => {
      this._model.classList.add('hidden');
    }, 2000);
  }

  // Method to show Error Message
  errMessage(msg = this._errMsg) {
    this._model.querySelector(
      '.model--box'
    ).innerHTML = `<div class="spinner flex ">
          <img src='${wrong}' >
          ${msg}...
        </div>`;

    this._model.classList.remove('hidden');
    setTimeout(() => {
      this._model.classList.add('hidden');
    }, 2000);
  }

  // Method to hide model box
  _hideModel() {
    this._model.classList.add('hidden');
  }
  
  //Method to close model
  _closeModel() {
    this._model.querySelector('.close').addEventListener('click', e => {
      this._hideModel();
    });
  }

  // method to Show loading
  showSpinner(msg = this._loadMsg) {
    this._model.querySelector(
      '.model--box'
    ).innerHTML = `<div class="spinner flex ">
          <svg>
            <use href="${spinner}#icon-loader"></use>
          </svg>
          ${msg}...
        </div>`;

    this._model.classList.remove('hidden');
  }
}
