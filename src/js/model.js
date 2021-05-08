import { API_URL, RES_PER_PAGE } from './config';
import { getProData, uploadImg, postProData } from './helper';

export const state = {
  users: [],
  products: [],
  page: 1,
  resultPerPage: RES_PER_PAGE,
  search: {
    products: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
};

const users = async function () {
  const resUsers = await fetch(`${API_URL}users`);

  state.users = await resUsers.json();
  // console.log(state.users);
};

// To get product data from Api
export const fetchProducts = async function () {
  state.products = await getProData();

  // store sort product data
  state.products = state.products
    .map((e, i) => {
      e.proId = i;
      e.productName = e.productName.replace(
        e.productName[0],
        e.productName[0].toUpperCase()
      );
      return e;
    })
    .filter(e => e.username === state.user.username)
    .sort((a, b) => {
      if (a.productName < b.productName) {
        return -1;
      }
      if (a.productName > b.productName) {
        return 1;
      }
      return 0;
    })
    .map((e, i) => {
      e.index = i + 1;
      return e;
    });
};
window.addEventListener('load', users);

//validate user login function
export const login = function (username, password, rem = false) {
  // console.log(state);
  if (
    !state.users.some(e => e.username === username && e.password === password)
  )
    throw new Error('Invalid username/password.');

  state.user = state.users.find(e => e.username === username);

  if (rem) localStorage.setItem('user', JSON.stringify(state.user));
};

// function to add new product
export const postProductData = async function (proData) {
  try {
    // product image
    const imgData = await uploadImg(proData.image);

    // upload Product data
    proData.image = `${API_URL}${imgData.path.replace('resources/', '')}`;

    proData.username = state.user.username;

    const res = await postProData(proData);

    // state.products.push(resData);
  } catch (err) {
    throw err;
  }
};

// function to update product data
export const updateProduct = async function (proData, id) {
  try {
    // console.log(proData, id);

    if (!proData) {
      const deletePro = await fetch(`${API_URL}products/delete`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ deleteId: id }),
        }),
        deleteProRes = await deletePro.json();
      console.log(deleteProRes);
      return 'Delet';
    }

    const imgData = await uploadImg(proData.image);
    // product data Updating
    proData.image = `${API_URL}${imgData.path.replace('resources/', '')}`;
    proData.username = state.user.username;
    proData.deleteId = id;
    const updatePro = await fetch(`${API_URL}products/update`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(proData),
      }),
      updateProRes = await updatePro.json();

    return 'Updat';
    // console.log(updateProRes);
  } catch (err) {
    throw err;
  }
};

// function to implement search
export const searchProduct = async function (keyword) {
  keyword = keyword.toLowerCase();

  const searchResults = state.products.filter(
    e =>
      e.productName.toLowerCase().includes(keyword) ||
      e.category.toLowerCase().includes(keyword)
  );

  // store sorted search result
  state.search.products = searchResults
    .map(e => {
      e.productName = e.productName.replace(
        e.productName[0],
        e.productName[0].toUpperCase()
      );

      return e;
    })
    .sort((a, b) => {
      if (a.productName < b.productName) {
        return -1;
      }
      if (a.productName > b.productName) {
        return 1;
      }
      return 0;
    })
    .map((e, i) => {
      e.index = i + 1;
      return e;
    });
  // console.log(state.searchResults);
};

export const getPage = function (page = state.page) {
  state.page = page;
  const start = (page - 1) * state.resultPerPage,
    end = page * state.resultPerPage;
  // console.log(state.search.resultPerPage);

  return state.products.slice(start, end);
};

export const getSearchPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage,
    end = page * state.search.resultPerPage;
  // console.log(state.search.resultPerPage);

  return state.search.products.slice(start, end);
};

export const addNewUser = async function (userData) {
  try {
    const addUserRes = await fetch(`${API_URL}users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await addUserRes.json();

    if (!addUserRes.ok) throw new Error(data.message);

    state.users = data;
  } catch (err) {
    throw err;
  }
};
