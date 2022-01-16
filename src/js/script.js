/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    bookList: '.books-list',
    templateOf: '#template-book',
    bookImage: '.book__image',
    filterForm: '.filters',
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
    thisBook.filters = [];
    thisBook.booklist = document.querySelector(select.bookList);
    thisBook.filter = document.querySelector(select.filterForm);

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
    
    thisBook.filter.addEventListener('click', function(event){
      const clickedElm = event.target;
      if(clickedElm.tagName == 'INPUT' && clickedElm.type == 'checkbox' && clickedElm.name == 'filter'){
        if(clickedElm.checked){
          thisBook.filters.push(clickedElm.value);
        }
        else{
          thisBook.filters.pop(clickedElm.value);
        }
        filterBooks();
      }
    });

  }

  function filterBooks(){
    const thisBook = this;
    
    for(let book of dataSource.books){
      let shouldBeHidden = false;
      for(let filter of thisBook.filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
      if(shouldBeHidden == true){
        bookImage.classList.add('hidden');
      }
      else{
        bookImage.classList.remove('hidden');
      }
    }
  }

  render();
  initActions();
}