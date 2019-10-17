let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages

    this.read = function (read) {
        return read ? "read already" : "not read yet"
    }

    this.sayName = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read()}`
    }
}

function addBookToLibrary(myLibrary, book) {
    return myLibrary.concat(book)
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