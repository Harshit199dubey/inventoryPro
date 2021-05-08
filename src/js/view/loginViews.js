import { Views } from './Views';

class loginViews extends Views {
  constructor() {
    super();
    this._parentEl = document.querySelector('.login--section');
    this._msg = 'Login success!!';
    this._errMsg = 'Invalid username/passward';
    this._loadMsg = 'Please wait Loading data....';
  }
  hide() {
    this._parentEl.parentElement.classList.add('hidden');
  }

  hideSpinner() {
    this._hideModel();
  }

  eventHandler(handler) {
    try {
      //attaching eventHandler on login form element
      const form = this._parentEl.querySelector('form');
      form.addEventListener('submit', e => {
        e.preventDefault();
        // store login credentials in varialbes enter by user
        const username = form.querySelector('input[name=username]').value,
          password = form.querySelector('input[name=password]').value,
          rem = form.querySelector('input[name=remember]').checked;

        // validating login credentials
        if (!username || !password) {
          this.errMessage('Username and Password should not be empty!!');
          throw new Error('Username and Password should not be empty!!');
        }
        if (
          username.includes(' ') ||
          username.includes('/') ||
          username.includes('-') ||
          username.includes('%')
        ) {
          this.errMessage('Username should not contains spaces, / , - and %');
          throw new Error('Username should not contains spaces, / , - and %');
        }
        if (password[0] === ' ') {
          this.errMessage('Password should not start with a space');
          throw new Error('Password should not start with a space');
        }

        // calling handler
        handler(username, password, rem);
      });
    } catch (err) {
      throw err;
    }
  }

  onLoad(handler) {
    window.addEventListener('load', () => {
      let user = localStorage.user;
      // console.log(user);
      if (!user)
        return window.history.pushState({}, '', window.location.origin);

      handler();
    });
  }
}

export default new loginViews();
