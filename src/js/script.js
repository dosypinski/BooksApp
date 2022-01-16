/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    bookList: '.books-list',
    templateOf: '#template-book',
    bookImage: '.book__image'
  };
  const tpl = Handlebars.compile(document.querySelector(select.templateOf).innerHTML);



  function render() {
    const thisBook = this;

    for(let book of dataSource.books){

      const generatedHTML = tpl(book);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const bookListContainer = document.querySelector(select.bookList);
      bookListContainer.appendChild(thisBook.element);
    }
  }


  function initActions() {
    const thisBook = this;

    thisBook.favoriteBooks = [];
    thisBook.booklist = document.querySelector(select.bookList);
    thisBook.booklist.addEventListener('dblclick', function(event){
      event.preventDefault();
      const image = event.target.offsetParent;
      const idBook = image.getAttribute('data-id');
      if(thisBook.favoriteBooks.includes(idBook)){
        image.classList.remove('favorite');
        thisBook.favoriteBooks.pop(idBook);
      }
      else{
        image.classList.add('favorite');
        thisBook.favoriteBooks.push(idBook);
      }
      console.log('favoriteBooks', thisBook.favoriteBooks);
    });
    

  }

  render();
  initActions();
}