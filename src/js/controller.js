// All imports
import * as model from './model';
import loginViews from './view/loginViews';
import loginView from './view/loginViews';
import productViews from './view/productViews';
import searchView from './view/searchView';
import paginationView from './view/paginationView';
import signUpView from './view/signUpView';

// Function to login user
const loginUser = async function (msgs = 'Welcome Back To Inventory pro!!') {
  loginView.showSpinner(msgs);
  if (localStorage.user) model.state.user = JSON.parse(localStorage.user);
  setTimeout(() => {
    loginView.hideSpinner();
  }, 3000);
  loginViews.hide();
  await model.fetchProducts();
  productViews.render(
    model.state.user.name,
    model.state.user.avatar,
    model.getPage()
  );
  // Render Pagination
  paginationView.pageRender(model.state);

  return Promise.resolve(setTimeout(() => {}, 3000));
};

//  fuction to controll login
const loginController = function (username, password, rem) {
  try {
    // console.log(username, password);
    model.login(username, password, rem);

    loginView.showSpinner();
    setTimeout(() => {
      loginUser();

      loginView.hideSpinner();
    }, 2000);
  } catch (err) {
    console.log(err);
    loginView.errMessage(err.message);
  }
};

//Add Product From Controller
const productFormController = async function (productData) {
  try {
    // resolve promise
    const enteredProductData = await productData;
    // function call to post product Data
    await model.postProductData(enteredProductData);

    // Render product Data
    await loginUser('Uploading product....');

    // Show Success Message
    productViews.successMessage('Product Uploaded Succsessfully');
  } catch (err) {
    console.log(err);
  }
};

// function to control form render
const productController = async function () {
  try {
    // method call to render form
    productViews.renderAddProductForm();

    await productViews.addProductFormHandler(productFormController);
  } catch (err) {
    console.log(err);
    productViews.errMessage(err.message);
  }
};

// Controller to handle Product Edit & Delete
const deleteEditProductController = async function (proData, id) {
  try {
    const res = await model.updateProduct(await proData, await id);

    await loginUser(`${res}ing product...`);
    productViews.successMessage(`Product ${res}ed Succsessfully`);
  } catch (err) {
    console.log(err);
    productViews.errMessage(err.message);
  }
};

// Function to handle Search
const searchController = async function (searchKeyword) {
  try {
    // pass search query
    await model.searchProduct(searchKeyword);

    //render search results
    searchView.render(model.getSearchPage());
    // Render Pagination
    paginationView.pageRender(model.state.search);
  } catch (err) {
    console.log(err);
    searchView.errMessage();
  }
};

// function to control pagination
const controlPagination = function (page) {
  try {
    if (model.state.search.products.length > 0) {
      //render search results
      searchView.render(model.getSearchPage(page));
      // Render Pagination
      paginationView.pageRender(model.state.search);
    } else {
      productViews.render(
        model.state.user.name,
        model.state.user.avatar,
        model.getPage(page)
      );
      // Render Pagination
      paginationView.pageRender(model.state);
    }
  } catch (err) {
    console.log(err);
    paginationView.errMessage(err.message);
  }
};
const controlSignUpForm = async function (userData) {
  try {
    console.log(userData);
    await model.addNewUser(userData);
    signUpView.successMessage('SignUp SuccessFully..');
  } catch (err) {
    console.log(err);
    signUpView.errMessage(err.message);
  }
};

const controlSignUp = function () {
  try {
    signUpView.render();
    signUpView.formSubmitHandler(controlSignUpForm);
  } catch (err) {
    console.log(err);
  }
};

function init() {
  loginView.eventHandler(loginController);
  loginView.onLoad(loginUser);
  productViews.eventHandler(productController);
  productViews.deleteEditProduct(deleteEditProductController);
  searchView.eventHandler(searchController);
  paginationView.eventHandlerClick(controlPagination);
  signUpView.eventHandler(controlSignUp);
}
init();
