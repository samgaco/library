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
  myLibrary.splice(index, 1);
  document.querySelectorAll('.book').forEach(node => {
    table.removeChild(node);
  });
  render();
}



const submitForm = ((evt) => {
  evt.preventDefault();
  console.log("invoked")
  let title = document.querySelector('.title').value;
  let author = document.querySelector('.author').value;
  let pages = document.querySelector('.pages').value;
  let status = document.querySelector('.not-read').checked ? false : true;
  let book = new Book(title, author, pages, status);
  myLibrary = addBookToLibrary(myLibrary, book);
  render();
})

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
    bookStatus.textContent =  book.read ? "Read":"Not read"
    bookElement.dataset.position = `${index}`;
    bookElement.classList.add('book','card','col-3','bg-secondary');


    append(bookElement, bookTitle);
    append(bookElement, bookAuthor);
    append(bookElement, bookPages);
    append(bookElement, bookStatus);
    append(bookElement, bookRemove );

    bookStatus.classList.add('btn', 'btn-light');
    bookRemove.classList.add('btn', 'btn-danger');


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
    document.querySelectorAll('.book').forEach(node => {
      table.removeChild(node);
    });
    return myLibrary.concat(book);

}

(
    function main() {
      
        let book0 = new Book("Lord of the rings", "tolkien", 500, false);
        let book1 = new Book("conferency of dunces", "john kennedy toole", 600, false);
        let book2 = new Book("farwell to arms", "ernest hemminway", 350, false);

        myLibrary = addBookToLibrary(myLibrary, book0);
        myLibrary = addBookToLibrary(myLibrary, book1);
        myLibrary = addBookToLibrary(myLibrary, book2);



        console.log(myLibrary)
    }
)();
