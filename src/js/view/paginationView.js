class PaginationView {
  constructor() {
    this._parentEl = document.querySelector('.pagination');
  }

  pageRender(data) {
    const numPage = Math.ceil(data.products.length / data.resultPerPage),
      currentPage = data.page;
    let html = '';

    if (numPage <= 4 && numPage > 1) {
      for (let i = 1; i <= numPage; i++) {
        html += `<a
                  href="#"
                  data-gotoPage = '${i}'
                  class="btn click-effect ${
                    i === currentPage ? 'bg-primary' : ''
                  } no-outline border"
                  >${i}</a
                >
      `;
      }
    } else if (numPage > 4) {
      const end = currentPage > 4 ? 3 : 4;
      for (let i = 1; i <= end; i++) {
        html += `<a
                  href="#"
                  data-gotoPage = '${i}'
                  class="btn click-effect ${
                    i === currentPage ? 'bg-primary' : ''
                  } no-outline border"
                  >${i}</a
                >
      `;
      }
      html += ` <a href="#" class="btn  no-outline border">....</a>
      ${
        numPage !== currentPage
          ? `<a href="#" data-gotoPage = '${currentPage}' class="btn click-effect  bg-primary no-outline border">${currentPage}</a>`
          : ''
      }          
      <a href="#" data-gotoPage = '${numPage}' class="btn click-effect  ${
        numPage === currentPage ? 'bg-primary' : ''
      } no-outline border">${numPage}</a>
      `;
    }
    // console.log(html);
    //page 1 , and there are other
    if (currentPage === 1 && numPage > 1) {
      this._renderPages(`
              ${html}
      
      <a href="#" data-gotoPage = "${
        currentPage + 1
      }" class="btn click-effect no-outline border">
                  <span class="fas fa-chevron-right"></span>
                </a>`);

      return;
    }

    //   last page
    if (currentPage === numPage && numPage > 1) {
      this._renderPages(`<a href="#" data-gotoPage = "${
        currentPage - 1
      }" class="btn click-effect no-outline border">
                  <span class="fas fa-chevron-left"></span>
                </a>
                ${html}`);
      return;
    }

    // other pages
    if (currentPage < numPage) {
      this._renderPages(`
                <a href="#" data-gotoPage = "${
                  currentPage - 1
                }" class="btn click-effect no-outline border">
                  <span class="fas fa-chevron-left"></span>
                </a>
                ${html}
                <a href="#" data-gotoPage = "${
                  currentPage + 1
                }" class="btn click-effect no-outline border">
                  <span class="fas fa-chevron-right"></span>
                </a>`);

      return;
    }

    //   page 1, and there are no other pages
    this._renderPages('');
    return '';
  }

  // render page on the web Page
  _renderPages(html) {
    this._parentEl.innerHTML = html;
  }

  eventHandlerClick(handler) {
    this._parentEl.addEventListener('click', e => {
      e.preventDefault();
      const el = e.target.closest('a');
      if (el && el.hasAttribute('data-gotoPage'))
        handler(+el.getAttribute('data-gotoPage'));
    });
  }
}
export default new PaginationView();
