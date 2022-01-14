/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    bookList: '.books-list',
    templateOf: '#template-book',
  };
  const tplSource = document.querySelector(select.templateOf).innerHTML;
  const tpl = Handlebars.compile(tplSource);

  function render() {
    const thisBook = this;

    for(let book of dataSource.books){
      const bookData = {
        id: book.id,
        name: book.name,
        price: book.price,
        rating: book.rating,
        image: book.image,
      };
      const generatedHTML = tpl(bookData);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const bookListContainer = document.querySelector(select.bookList);
      bookListContainer.appendChild(thisBook.element);
    }
  }
  render();
}