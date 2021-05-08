import arrowDownIcon from 'url:../../../resources/svg/small-down.svg';
import deleteIcon from 'url:../../../resources/svg/baseline-delete-24px.svg';
import editIcon from 'url:../../../resources/svg/baseline-border_color-24px.svg';

import { Views } from './Views';

class ProductView extends Views {
  constructor() {
    super();
    this._parentEl = document.querySelector('.dashboard');
  }

  // All Methods

  // method to add tooltip
  _addToolTip(el, msg) {
    try {
      const html = `<span class="toolttext">
                   <span class="fas fa-info-circle"></span>
                  ${msg}
                </span>`,
        input = el.querySelector('input');
      input.classList.add('error--border');

      // check the input type
      if (input.type === 'file') el = el.querySelector('label[for="pro-img"]');

      // check if ToolTip is added
      if (el.className.includes('tooltipright')) return;

      // add tooltip
      el.classList.add('tooltipright');
      el.insertAdjacentHTML('beforeend', html);

      // time out to remove tooptip
      setTimeout(() => {
        input.classList.remove('error--border');
        el.querySelector('.toolttext').remove();
        el.classList.remove('tooltipright');
      }, 5000);
    } catch (err) {
      throw err;
    }
  }

  // method to render dashboard Header
  render(name, avatar, productsArr) {
    try {
      console.log(avatar);
      const userInfo = this._parentEl.querySelector('.dashboard--main header');

      userInfo.innerHTML = `   <nav class="flex ">
            <span class="hoz-bar"></span>
            <div class='flex user-log'>
            <p class='log-name'>${name}</p>
            <a href="#"  class='down-arrow'>
              <img
                src="${arrowDownIcon}"
                alt="down-arrow"
                class="icon small"
              />
              
            </a>
            <span class='user-logout hidden'>
              <a href="#" class='logout'>Logout</a>
            </span>
            <!--User Avatar -->
            <a href="#" class='avatar'>
              <img
                src="${avatar}"
                alt="Harshit Dubey"
                class="icon medium"
              />
              
            </a>
            </div>
            
          </nav>`;

      this._parentEl.classList.remove('hidden');
      this._renderProducts(productsArr);
      this._logoutHandler();
    } catch (err) {
      throw err;
    }
  }

  _renderProducts(proArr) {
    // console.log(proArr);

    let html = proArr
      .map((e, i) => {
        return `<li class="grid">
                    <p class="id" data-id = '${e.proId}'>${e.index}</p>
                    <p class="pro-img">
                      <img
                        src="${e.image}"
                        class="icon medium"
                        alt=""
                      />
                    </p>
                    <p class="pro-name">${e.productName}</p>
                    <p class="pro-des" data-des = '${
                      e.description
                    }'>${e.description.slice(0, 20)}...</p>
                    <p class="pro-cat">${e.category}</p>
                    <p class="pro-skuId">${e.skuId}</p>
                    <p class="pro-qty">${e.quantity} Units</p>
                    <p class="pro-unitPrice">₹ ${e.unitPrice}</p>
                    <p class="pro-totalPrice">₹ ${e.totalPrice}</p>

                    <!-- Product Edit & Delete button -->
                    <p>
                      <img
                        src="${editIcon}"
                        class="icon edit click-effect"
                        alt=""
                      /><img
                        src="${deleteIcon}"
                        class="icon delete click-effect"
                        alt=""

                      />
                    </p>
                  </li>
                  `;
      })
      .join('');
    if (proArr.length === 0)
      html = `<div class="empty--product flex" >
                    <p>
                    No Products are added.<br>
                    To add Product click On Add Product Button
                    </p>
                  </div>
                  `;
    this._parentEl.querySelector('.list-products').innerHTML = html;
    const url = new URL(window.location.origin);

    window.history.pushState({}, '', url + 'dashboard');
  }

  // method to Handle logout
  _logoutHandler() {
    try {
      const userLog = this._parentEl.querySelector('.user-log');

      userLog.addEventListener('click', e => {
        const el = e.target.className;
        // console.log(el);

        if (el.includes('logout')) this._clearUserData();

        if (!el.includes('log-name') && !el.includes('icon')) return;

        const logoutBtn = userLog.querySelector('.user-logout');
        logoutBtn.classList.toggle('hidden');
        logoutBtn.classList.toggle('show');

        // console.log(e.target);
      });
    } catch (err) {
      throw err;
    }
  }

  // mathod to clear user data from localstorage
  _clearUserData() {
    console.log(this);
    localStorage.removeItem('user');
    //Redirect to the current URL.
    window.location.href = window.location.origin;
  }

  // eventHandler on add product btn
  eventHandler(handler) {
    const addbtn = this._parentEl.querySelector('.add-product');
    addbtn.addEventListener('click', handler);
  }

  // method to render add product form on model Box
  renderAddProductForm() {
    try {
      this._model.querySelector(
        '.model--box'
      ).innerHTML = ` <div class="header grid">
          <h4 class="primary">Add Product</h4>
          <span class="icon close">
            <span class="fas fa-times faded--text click-effect"></span>
          </span>
        </div>

        <!-- model box body -->
        <div class="model--box--body flex">
          <!-- Add product form -->

          <form action="#" enctype="multipart/form-data">
            <p class="grid">
              <label for="pro-name">
                Product :<sup class="error">*</sup>
              </label>
              <input
                type="text"
                name="pro-name"
                id="pro-name"
                required
                placeholder="Product Name"
              />
            </p>
            <p class="grid">
              <label for="pro-des">Description :</label>
              <input
                type="text"
                id="pro-des"
                name="pro-des"
                placeholder="Description"
              />
            </p>
            <p class="grid">
              <label for="pro-category">
                Category :<sup class="error">*</sup>
              </label>
              <select  name="pro-category"
                id="pro-category"
                placeholder="Product Category" class="faded--text"
                required>
                <option value='' >Product Category</option>

                ${this._category
                  .map(e => `<option value='${e}'>${e}</option>`)
                  .join('')}                
                
                </select>
              
            </p>
            <div class="pro--number--inputs grid">
              <p class="grid ">
                <label for="sku-id">SKU ID :<sup class="error">*</sup></label>
                <input
                  type="text"
                  name="shu-id"
                  id="sku-id"
                  placeholder="#12345"
                  required
                />
                
              </p>
              <p class="grid">
                <label for="pro-qty"
                  >Quantity :<sup class="error">*</sup></label
                >
                <input
                  type="number"
                  name="pro-qty"
                  id="pro-qty"
                  placeholder="00"
                  required
                />
              </p>
              <p class="grid">
                <label for="pro-unit-price"
                  >Unit Price :<sup class="error">*</sup></label
                >
                <input
                  type="number"
                  name="pro-unit-price"
                  id="pro-unit-price"
                  placeholder="₹00.00"
                  required
                />
              </p>
              <p class="grid">
                <label for="pro-total-price"
                  >Total Price :<sup class="error">*</sup></label
                >
                <input
                  type="number"
                  name="pro-total-price"
                  id="pro-total-price"
                  required
                  placeholder="₹00.00"
                  required
                />
              </p>
            </div>

            <p class="grid pro-img-sec">
              <label>Image:</label>
              <span class="flex img-sec">
              <span class = 'output hidden'>
              <span class="fas fa-times close click-effect"></span>
              <img src='' />
              </span>
              <label for="pro-img" class="click-effect">+</label>
              </span>
              <input type="file" id="pro-img" name="pro-img" class="hidden" />
            </p>
            <p class="grid">
              <span></span>
              <span class="model--form--btn">
                <button type="reset" class="btn btn--reset bg-secondary click-effect">
                  Reset
                </button>
                <button type="submit" class="btn btn--save click-effect">Save</button>
              </span>
            </p>
          </form>
        </div>`;
      this._model.classList.remove('hidden');

      this._selectOption();
      this._model
        .querySelector('#pro-img')
        .addEventListener('change', this._imageHandler);
      this._closeModel();
    } catch (err) {
      throw err;
    }
  }

  _imageHandler(e) {
    const src = URL.createObjectURL(this.files[0]),
      imgBox = this.parentElement.querySelector('.img-sec .output');
    this.parentElement.querySelector('.img-sec .output img').src = src;
    // console.log(img);

    imgBox.classList.remove('hidden');

    this.parentElement
      .querySelector('.img-sec .output .close')
      .addEventListener('click', () => {
        imgBox.classList.add('hidden');
      });
  }

  _closeModel() {
    this._model.querySelector('.close').addEventListener('click', e => {
      this._model.classList.add('hidden');
    });
  }

  //method to customize Select tag
  _selectOption() {
    this._model.querySelector('select').addEventListener('change', function () {
      if (!this.value) return this.classList.add('faded--text');
      this.classList.remove('faded--text');
    });
  }

  // method to handle form submit
  async addProductFormHandler(handler) {
    const model = this._model.querySelector('form');
    model.addEventListener('submit', e => {
      e.preventDefault();
      handler(Promise.resolve(this._sendProductData(model)));
    });
  }

  // method to return the Product Data & validate it.
  _sendProductData(obj) {
    // e.preventDefault();
    // console.log(this);
    try {
      const skuIdInp = obj.querySelector('#sku-id'),
        proName = obj.querySelector('#pro-name').value,
        des = obj.querySelector('#pro-des').value,
        category = obj.querySelector('#pro-category').value,
        skuId = skuIdInp.value,
        qty = obj.querySelector('#pro-qty'),
        unitPrice = obj.querySelector('#pro-unit-price'),
        totalPrice = obj.querySelector('#pro-total-price'),
        proImg = obj.querySelector('#pro-img');

      // validate SKU ID
      if (!skuId.startsWith('#') || !+skuId.slice(1) || !(skuId.length === 6)) {
        this._addToolTip(skuIdInp.parentElement, ' Invalid USK ID.');
        throw new Error(`Invalid USK ID.`);
      }

      // check if image is uploaded or not
      if (!proImg.files[0]) {
        this._addToolTip(
          proImg.parentElement,
          ' Please Uplaod the product Image'
        );
        throw new Error(' Please Uplaod the product Image');
      }
      // check if uploaded image is valid for not
      if (!proImg.files[0].type.includes('image')) {
        this._addToolTip(
          proImg.parentElement,
          'Please upload a valid Image file.'
        );
        throw new Error('Please upload a valid Image file.');
      }

      //  validate Quantity
      if (qty.value < 1) {
        this._addToolTip(
          qty.parentElement,
          'Quantity should be greater than 1.'
        );
        throw new Error('Quantity should be greater than 1.');
      }

      //  validate Unit Price
      if (unitPrice.value < 1) {
        this._addToolTip(
          unitPrice.parentElement,
          'unit should be greater than 1.'
        );
        throw new Error('unit should be greater than 1.');
      }

      //  validate Total Price
      if (+totalPrice.value !== qty.value * unitPrice.value) {
        this._addToolTip(
          totalPrice.parentElement,
          `Total Price should be equal to ${+qty.value * +unitPrice.value}.`
        );
        throw new Error(
          `Total Price should be equal to ${+qty.value * +unitPrice.value}.`
        );
      }

      // return the product data
      return {
        productName: proName,
        description: des,
        category: category,
        skuId,
        quantity: qty.value,
        unitPrice: unitPrice.value,
        totalPrice: totalPrice.value,
        image: proImg.files[0],
      };
    } catch (err) {
      throw err;
    }
  }
  deleteEditProduct(handler) {
    try {
      this._parentEl
        .querySelector('.list-products')
        .addEventListener('click', e => {
          if (e.target.className.includes('edit'))
            return this._editProduct(e.target, handler);
          if (e.target.className.includes('delete'))
            return this._deleteProduct(e.target, handler);
        });
    } catch (err) {
      throw err;
    }
  }
  _deleteProduct(el, handler) {
    try {
      const prEl = el.closest('li'),
        id = +prEl.querySelector('.id').getAttribute('data-id');

      this._model.querySelector(
        '.model--box'
      ).innerHTML = `<div class="header grid">
          <h4 class="primary">Delete Product</h4>
          <span class="icon close">
            <span class="fas fa-times faded--text click-effect"></span>
          </span>
        </div>

        <!-- model box body -->
        <div class="model--box--body flex  delete-confirm">
          <!-- Delete product form -->
      <p>Are you sure you want to permanently delete the product?</p>

      <p class = 'flex '>
      <a href='#' class='btn bg-primary'>Yes</a>
      <a href='#' class='btn bg-secondary border'>No</a>
       
      </p>
          
        </div>`;

      this._model.classList.remove('hidden');
      this._closeModel();
      this._model
        .querySelector('.delete-confirm')
        .addEventListener('click', e => {
          e.preventDefault();
          if (e.target.innerText === 'Yes') return handler(false, id);
          if (e.target.innerText === 'No')
            return this._model.classList.add('hidden');
        });
    } catch (err) {
      throw err;
    }
  }
  _editProduct(el, handler) {
    try {
      const prEl = el.closest('li'),
        id = +prEl.querySelector('.id').getAttribute('data-id'),
        proName = prEl.querySelector('.pro-name').innerHTML,
        proDes = prEl.querySelector('.pro-des').getAttribute('data-des'),
        proCat = prEl.querySelector('.pro-cat').innerHTML,
        proSkuId = prEl.querySelector('.pro-skuId').innerHTML,
        proQty = parseInt(prEl.querySelector('.pro-qty').innerHTML),
        unitPrice = parseFloat(
          prEl.querySelector('.pro-unitPrice').innerHTML.slice(1)
        ),
        totalPrice = parseFloat(
          prEl.querySelector('.pro-totalPrice').innerHTML.slice(1)
        );

      console.log(proDes);
      this._model.querySelector(
        '.model--box'
      ).innerHTML = ` <div class="header grid">
          <h4 class="primary">Edit Product</h4>
          <span class="icon close">
            <span class="fas fa-times faded--text click-effect"></span>
          </span>
        </div>

        <!-- model box body -->
        <div class="model--box--body flex">
          <!-- Add product form -->

          <form action="#" enctype="multipart/form-data">
            <p class="grid">
              <label for="pro-name">
                Product :<sup class="error">*</sup>
              </label>
              <input
                type="text"
                name="pro-name"
                id="pro-name"
                required
                placeholder="Product Name"
                value = '${proName}'
              />
            </p>
            <p class="grid">
              <label for="pro-des">Description :</label>
              <input
                type="text"
                id="pro-des"
                name="pro-des"
                placeholder="Description"
                value = '${proDes}'
              />
            </p>
            <p class="grid">
              <label for="pro-category">
                Category :<sup class="error">*</sup>
              </label>
              <select  name="pro-category"
                id="pro-category"
                placeholder="Product Category" class="faded--text"
                required>
                <option value='${proCat}' >${proCat}</option>
                ${this._category
                  .filter(e => !(e === proCat.replace('amp;', '')))
                  .map(e => `<option value='${e}'>${e}</option>`)
                  .join('')}      
                
                </select>
              
            </p>
            <div class="pro--number--inputs grid">
              <p class="grid ">
                <label for="sku-id">SKU ID :<sup class="error">*</sup></label>
                <input
                  type="text"
                  name="shu-id"
                  id="sku-id"
                  placeholder="#12345"
                  value = '${proSkuId}'
                  required
                />
                
              </p>
              <p class="grid">
                <label for="pro-qty"
                  >Quantity :<sup class="error">*</sup></label
                >
                <input
                  type="number"
                  name="pro-qty"
                  id="pro-qty"
                  placeholder="00"
                  value="${proQty}"
                  required
                />
              </p>
              <p class="grid">
                <label for="pro-unit-price"
                  >Unit Price :<sup class="error">*</sup></label
                >
                <input
                  type="number"
                  name="pro-unit-price"
                  id="pro-unit-price"
                  placeholder="₹00.00"
                  value='${unitPrice}'
                  required
                />
              </p>
              <p class="grid">
                <label for="pro-total-price"
                  >Total Price :<sup class="error">*</sup></label
                >
                <input
                  type="number"
                  name="pro-total-price"
                  id="pro-total-price"
                  required
                  placeholder="₹00.00"
                  value="${totalPrice}"
                  required
                />
              </p>
            </div>

            <p class="grid pro-img-sec">
              <label>Image:</label>
              <span class="flex img-sec">
              <span class = 'output hidden'>
              <span class="fas fa-times close click-effect"></span>
              <img src='' />
              </span>
              <label for="pro-img" class="click-effect">+</label>
              </span>
              <input type="file" id="pro-img" name="pro-img" class="hidden" />
            </p>
            <p class="grid">
              <span></span>
              <span class="model--form--btn">
                <button type="reset" class="btn btn--reset bg-secondary click-effect">
                  Reset
                </button>
                <button type="submit" class="btn btn--save click-effect">Save</button>
              </span>
            </p>
          </form>
        </div>`;
      this._model.classList.remove('hidden');

      this._selectOption();

      const model = this._model.querySelector('form');
      model.addEventListener('submit', e => {
        e.preventDefault();
        handler(Promise.resolve(this._sendProductData(model)), id);
      });
      this._model
        .querySelector('#pro-img')
        .addEventListener('change', this._imageHandler);
      this._model.querySelector('.close').addEventListener('click', e => {
        this._model.classList.add('hidden');
      });
    } catch (err) {
      throw err;
    }
  }
}

export default new ProductView();
