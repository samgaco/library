let myLibrary = [
];

const toggleStatus = (event, index, myLibrary) => {
  let bookStatus = event.target;
  if (bookStatus.textContent === `Read`){
    bookStatus.textContent = `Not Read`;
    myLibrary[index].status = false;
  }else{
    bookStatus.textContent = `Read`;
    myLibrary[index].status = true;
  }
};

const removeBook = (evt, index, myLibrary) => {
  console.log("invoked!");
  myLibrary.splice(index, 1);
  render();
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }

function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

const addBook = document.querySelector('.add-book');

const table = document.querySelector('.table')

const render = (evt) => {
  myLibrary.forEach( (book, index, myLibrary) => {

    let bookElement = creatNode('div');
    let bookTitle = creatNode('h2');
    let bookAuthor = creatNode('p');
    let bookPages = creatNode('p');
    let bookRemove = creatNode('button');
    let bookStatus = creatNode('button');

    bookTitle.textContent = `Title: ${book.title}`;
    bookAuthor.textContent = `Author: ${book.author}`;
    bookPages.textContent = `No of Pages: ${book.pages}`;
    bookRemove.textContent = `Remove book`;
    bookStatus.textContent = 'Not Read';
    bookElement.setAttribute('data', `position: '${index}'` )

    append(bookElement, bookTitle);
    append(bookElement, bookAuthor);
    append(bookElement, bookPages);
    append(bookElement, bookStatus);
    append(bookElement, bookRemove );

    append(table, bookElement);

    bookStatus.addEventListener('click', (evt) => {
      toggleStatus(evt, bookElement.dataset.position, myLibrary);
    });
    bookRemove.addEventListener('click', (evt) => {
      removeBook(evt, bookElement.dataset.position, myLibrary);
    })
  })
}

const creatNode = (el) => {
  return document.createElement(el);
};

const append = (parent, child) => {
  return parent.appendChild(child);
};

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.readStatus = function () {
        return this.read ? "read already" : "not read yet"
    }

    this.sayName = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus()}`
    }
}

function addBookToLibrary(myLibrary, book) {
    return myLibrary.concat(book);

}

(
    function main() {
        let book0 = new Book("gfda", "James", 110, false);
        let book1 = new Book("hobbit", "tolkien", 200, false);
        let book2 = new Book("grown cubicles", "john green", 840, false);

        myLibrary = addBookToLibrary(myLibrary, book0);
        myLibrary = addBookToLibrary(myLibrary, book1);
        myLibrary = addBookToLibrary(myLibrary, book2);

        console.log(myLibrary)
    }
)();
