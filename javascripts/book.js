/* eslint-env browser */
/* eslint no-unused-vars: [1, {"argsIgnorePattern": "evt"}] */

const { $ } = window;

let myLibrary = [];

const table = document.querySelector('.table');

const creatNode = el => document.createElement(el);

const append = (parent, child) => parent.appendChild(child);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const toggleStatus = (event, index, libraryArg) => {
  const bookStatus = event.target;
  if (bookStatus.textContent === 'Read') {
    bookStatus.textContent = 'Not Read';
    libraryArg[index].status = false;
  } else {
    bookStatus.textContent = 'Read';
    libraryArg[index].status = true;
  }
};

const removeBook = (evt, index, libraryArg) => {
  libraryArg.splice(index, 1);
  document.querySelectorAll('.book').forEach((node) => {
    table.removeChild(node);
  });
};

function addBookToLibrary(libraryArg, book) {
  document.querySelectorAll('.book').forEach((node) => {
    table.removeChild(node);
  });
  return libraryArg.concat(book);
}

const submitForm = (evt, renderArg) => {
  evt.preventDefault();
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  const pages = document.querySelector('.pages').value;
  const status = !document.querySelector('.not-read').checked;
  const book = new Book(title, author, pages, status);
  myLibrary = addBookToLibrary(myLibrary, book);
  renderArg();
};

function openForm() {
  document.getElementById('myForm').style.display = 'block';
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
}

function clearForms() {
  $(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
  $(':checkbox, :radio').prop('checked', false);
}

const startApp = (renderArg) => {
  document.querySelector('.submit').addEventListener('click', (evt) => {
    submitForm(evt, renderArg);
  });
  document.querySelector('.add-book').addEventListener('click', (evt) => {
    openForm();
  });
  document.querySelector('.close-form').addEventListener('click', (evt) => {
    clearForms();
    closeForm();
  });
};

let appStarted = false;

const render = () => {
  myLibrary.forEach((book, index, libraryArg) => {
    const bookElement = creatNode('div');
    const bookTitle = creatNode('h2');
    const bookAuthor = creatNode('p');
    const bookPages = creatNode('p');
    const bookRemove = creatNode('button');
    const bookStatus = creatNode('button');

    bookTitle.textContent = `Title: ${book.title}`;
    bookAuthor.textContent = `Author: ${book.author}`;
    bookPages.textContent = `No of Pages: ${book.pages}`;
    bookRemove.textContent = 'Remove book';
    bookStatus.textContent = book.read ? 'Read' : 'Not read';
    bookElement.dataset.position = `${index}`;
    bookElement.classList.add(
      'book',
      'card',
      'col-3',
      'bg-secondary',
      'text-white',
    );

    append(bookElement, bookTitle);
    append(bookElement, bookAuthor);
    append(bookElement, bookPages);
    append(bookElement, bookStatus);
    append(bookElement, bookRemove);

    bookStatus.classList.add('btn', 'btn-light');
    bookRemove.classList.add('btn', 'btn-danger');

    append(table, bookElement);

    bookStatus.addEventListener('click', (evt) => {
      toggleStatus(evt, bookElement.dataset.position, libraryArg);
    });
    bookRemove.addEventListener('click', (evt) => {
      removeBook(evt, bookElement.dataset.position, libraryArg);
      render();
    });
  });
  if (!appStarted) {
    startApp(render);
    appStarted = true;
  }
};
(function main() {
  render();
  const book0 = new Book('The Lord of the Rings', 'J. R. R. Tolkien', 500, false);
  const book1 = new Book('A Confederacy of Dunces', 'John Kennedy Toole', 600, false);
  const book2 = new Book('A Farewell to Arms', 'Ernest Hemingway', 350, false);
  myLibrary = addBookToLibrary(myLibrary, book0);
  myLibrary = addBookToLibrary(myLibrary, book1);
  myLibrary = addBookToLibrary(myLibrary, book2);
}());