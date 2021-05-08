import deleteIcon from 'url:../../../resources/svg/baseline-delete-24px.svg';
import editIcon from 'url:../../../resources/svg/baseline-border_color-24px.svg';
import { Views } from './Views';

class SearchViews extends Views {
  constructor() {
    super();
    this._parentEl = document.querySelector('.dashboard .list-products');
    this._search = document.querySelector('input[name=search]');
  }

  eventHandler(handler) {
    this._search.addEventListener('change', () => {
      // console.log();

      handler(this._search.value);
    });
  }

  render(proArr) {
    try {
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
                    <p class="pro-des" data-des = "${
                      e.description
                    }">${e.description.slice(0, 20)}...</p>
                    <p class="pro-cat">${e.category}</p>
                    <p class="pro-skuId">${e.skuId}</p>
                    <p class="pro-qty">${e.quantity} Units</p>
                    <p class="pro-unitPrice">₹ ${e.unitPrice}</p>
                    <p class="pro-totalPrice">₹ ${e.totalPrice}</p>

                    <!-- Product Edit & Delete button -->
                    <p>
                      <img
                        src="${editIcon}"
                        class="icon edit"
                        alt=""
                      /><img
                        src="${deleteIcon}"
                        class="icon delete"
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
                    No Products Found.<br>
                    For your search query
                    </p>
                  </div>
                  `;
      this._parentEl.innerHTML = html;
    } catch (err) {
      throw err;
    }
  }
}

export default new SearchViews();
