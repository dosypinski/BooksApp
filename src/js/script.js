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


  class BooksList {
    constructor(){
      const thisBook = this;

      thisBook.initData();
      thisBook.getElements();
      thisBook.render();
      thisBook.initActions();
    }

    initData(){
      this.data = dataSource.books;
    }

    getElements(){
      const thisBook = this;

      thisBook.booklist = document.querySelector(select.bookList);
      thisBook.filter = document.querySelector(select.filterForm);

    }

    render() {
      const thisBook = this;

      for(let book of dataSource.books){
        const bookData= {
          id: book.id,
          name: book.name,
          price: book.price,
          rating: book.rating,
          image: book.image,
        };
        const ratingBgc = thisBook.determineRatingBgc(bookData.rating);
        bookData.ratingBgc = ratingBgc;

        const ratingWidth = book.rating * 10;
        bookData.ratingWidth = ratingWidth;

        const generatedHTML = tpl(bookData);
        thisBook.element = utils.createDOMFromHTML(generatedHTML);
        const bookListContainer = document.querySelector(select.bookList);
        bookListContainer.appendChild(thisBook.element);
        console.log(bookData);
      }
    }



    initActions() {
      const thisBook = this;

      thisBook.favoriteBooks = [];
      thisBook.filters = [];

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
          thisBook.filterBooks();
        }
      });

    }

    filterBooks(){
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

        if(shouldBeHidden){
          bookImage.classList.add('hidden');
        }
        else{
          bookImage.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){
    
      let background = '';
      if(rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }else if(rating > 6 && rating <= 8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }else if(rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
  }
  new BooksList();
}