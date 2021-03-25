let myLibrary = [];
class Book {
    constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    }
}

function addToLibraryArray(newBook) {
    myLibrary.push(newBook);
    storeLocal();
    return true;
}

function removeFromLibraryArray(bookName) {
    myLibrary.splice(myLibrary.indexOf(bookName), 1);
    storeLocal();
}

function getBook(bookTitle) {
    for (let book of myLibrary) {
        if (book.title === bookTitle) {
            return book;
        }
    }
}

const libraryContainer = document.querySelector(`.library-container`)

function displayBook(book) { 
    const bookDiv = document.createElement(`div`);
    const titleDiv = document.createElement(`h2`);
    const authorDiv = document.createElement(`h3`);
    const pagesDiv = document.createElement(`h3`);
    const buttonContainerDiv = document.createElement(`div`);
    const readBtnDiv = document.createElement(`button`);
    const removeBtnDiv = document.createElement('button');
    

    bookDiv.classList.add(`book-card`); 
    bookDiv.classList.add(`book-card-text`);
    removeBtnDiv.classList.add(`remove-button`);
    readBtnDiv.classList.add(`read-button`);
    
    buttonContainerDiv.appendChild(removeBtnDiv);
    buttonContainerDiv.appendChild(readBtnDiv);
    buttonContainerDiv.classList.add(`button-container-div`);

    titleDiv.textContent = book.title;
    authorDiv.textContent = book.author;
    pagesDiv.textContent = book.pages + " pages";
    removeBtnDiv.textContent = `Remove`;
    readBtnDiv.textContent = `Read`;
 
    if (book.read) {
        readBtnDiv.style.backgroundColor = `#10c719`;
    } else {
        readBtnDiv.textContent = "Not Read"
        readBtnDiv.style.backgroundColor = `#ff3232`;
    }

    removeBtnDiv.addEventListener("mouseover", function( event ) {
        event.target.style.filter= `grayscale(50%)`;
    })

    removeBtnDiv.addEventListener("mouseout", function( event ) {
        event.target.style.filter = `grayscale(0%)`;
    })

    readBtnDiv.addEventListener("mouseover", function( event ) {
        event.target.style.filter= `grayscale(50%)`;
    })

    readBtnDiv.addEventListener("mouseout", function( event ) {
        event.target.style.filter = `grayscale(0%)`;
    })
    
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(pagesDiv);
    bookDiv.appendChild(readBtnDiv);
    bookDiv.appendChild(removeBtnDiv);
    libraryContainer.appendChild(bookDiv);

    removeBtnDiv.addEventListener(`click`, () => {
        removeFromLibraryArray(book);
        updateLibrary();
    })

    readBtnDiv.addEventListener(`click`, () => {
        book.read = !book.read;
        updateLibrary();
    })
}

function resetLibrary() {
    libraryContainer.innerHTML = ``;
}

function updateLibrary() {
    resetLibrary();
    for (let book of myLibrary) {
        displayBook(book);
    }
}

const myForm = document.querySelector(`.form-container`)
myForm.addEventListener(`submit`, addBookToPage);

function addBookToPage(e) {
    e.preventDefault();
    if (addToLibraryArray(bookInput())) {
        updateLibrary();
        closeForm();
        myForm.reset();
    }
}

function bookInput() {
    const bookTitle = document.getElementById(`title`);
    const bookAuthor = document.getElementById(`author`);
    const bookPages = document.getElementById(`pages`);
    const bookRead = document.getElementById(`read-check`);
    
    return new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
}

const newBookButton = document.querySelector(`.new-book`);
newBookButton.addEventListener(`click`, openForm);
const popup = document.querySelector(`.form-popup`);
const bodyDiv = document.querySelector(`body`);

function openForm() {
    popup.style.display = "block";
    newBookButton.style.opacity = "0";
}

function closeForm() {
    popup.style.display = "none";
    newBookButton.style.opacity = "1";
}

//testing local storage
function storeLocal() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary)); //sets myLibrary to the object as a k:v pair
}
  
function restoreLocal() {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary")); //converts JSON script into an object
    if (myLibrary === null) { //if myLibrary has no content, restore an empty array
        myLibrary = [];
    updateLibrary();
    }
}

restoreLocal();