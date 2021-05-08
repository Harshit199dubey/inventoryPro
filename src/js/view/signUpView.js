import { Views } from './Views';

class SignUpView extends Views {
  constructor() {
    super();
    this._signUpBtn = document.querySelector('.login--form .signUp');
  }

  eventHandler(handler) {
    this._signUpBtn.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }

  render() {
    const modelForm = this._model.querySelector('.model--box--body'),
      html = `<form action="#">
            <p class="grid">
              <label for="user-name">
                Fullname:<sup class="error">*</sup>
              </label>
              <input
                type="text"
                name="user-name"
                id="user-name"
                required
                placeholder="Enter your Fullname"
              />
            </p>

            <p class="grid">
              <label for="gender"> Gender :<sup class="error">*</sup> </label>
              <select  name="gender" id="gender" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </p>
            <p class="grid">
              <label for="username">
                Username:<sup class="error">*</sup>
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                placeholder="Enter your username"
              />
            </p>
            <p class="grid">
              <label for="password">
                Password:<sup class="error">*</sup>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="Enter your password"
              />
            </p>
            <p class="grid">
              <span></span>
              <span class="model--form--btn">
                <button
                  type="reset"
                  class="btn click-effect btn--reset bg-secondary"
                >
                  Reset
                </button>
                <button type="submit" class="btn click-effect bg-primary">
                  SignUp
                </button>
              </span>
            </p>
          </form>
`;

    modelForm.innerHTML = html;
    this._model.classList.remove('hidden');
    this._closeModel();
  }

  formSubmitHandler(handler) {
    try {
      const form = this._model.querySelector('form');

      form.addEventListener('submit', e => {
        e.preventDefault();
        // store signup credentials in varialbes enter by user
        const name = form.querySelector('input[name=user-name]').value,
          username = form.querySelector('input[name=username]').value,
          password = form.querySelector('input[name=password]').value,
          gender = form.querySelector('select[name=gender]').value;

        // validating signup credentials
        if (!username || !password) {
          this._errMsgFun('Username and Password should not be empty!!');
        }
        if (
          username.includes(' ') ||
          username.includes('\\') ||
          username.includes('/') ||
          username.includes('-') ||
          username.includes('%')
        )
          this._errMsgFun('Username should not contains spaces, / , - and %');
        if (password[0] === ' ')
          this._errMsgFun('Password should not start with a space');

        handler({ name, username, password, gender });
      });
    } catch (err) {
      throw err;
    }
  }
  // to show error message
  _errMsgFun(msg) {
    this.errMessage(msg);
    throw new Error(msg);
  }

  // to render error message
  errMessage(msg) {
    const model = this._model.querySelector('.err-message');
    model.insertAdjacentText('afterbegin', msg);

    setTimeout(() => {
      model.textContent = '';
    }, 5000);
  }
}

export default new SignUpView();
