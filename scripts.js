let myLibrary = [];

function Book (title, author, pages, status, added){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.added = added;
}


const newBookButton = document.querySelector("#newBook");
const newBookDialog = document.querySelector("#newBookDialog");
const closeDialogButton = newBookDialog.querySelector("#closeDialog");
const addBookButton = newBookDialog.querySelector("#addBook");

const titleDialog = newBookDialog.querySelector("input[name=title]");
const authorDialog = newBookDialog.querySelector("input[name=author]");
const pagesDialog = newBookDialog.querySelector("input[name=pages]");
const statusDialog = newBookDialog.querySelector("input[name=status]");

const container = document.querySelector(".container");
const itemNode = document.querySelector(".item");

const removeButtons = container.querySelectorAll(".remove");
const changeStatusButtons = container.querySelectorAll(".changeStatus");


// Hide item template
container.removeChild(itemNode);

//test
// const book = new Book("Cosik", "Autor", "389", true, true);
// const theHobbit = new Book("L.O.T.R.", "J.R.R. Tolkien", "289", true, true);
// myLibrary.push(book);
// myLibrary.push(theHobbit);
// myLibrary.push(book);
// myLibrary.push(theHobbit);
// myLibrary.push(book);
// myLibrary.push(theHobbit);
// createItem(myLibrary[0]);
// createItem(myLibrary[1]);
// createItem(myLibrary[2]);
// createItem(myLibrary[3]);
// createItem(myLibrary[4]);
// createItem(myLibrary[5]);
//test

checkStorage();

newBookButton.addEventListener("click", () => {
    clearDialog();
    newBookDialog.showModal();
})

closeDialogButton.addEventListener("click", () => {
    newBookDialog.close();
})

addBookButton.addEventListener("click", () => {
    newBook();
})

function validateForm(){
    const form = newBookDialog.querySelector("form");
    return form.checkValidity();
}

function getDialogValues(){

}

function newBook(){
    if(validateForm()){
        const book = new Book(titleDialog.value, authorDialog.value, pagesDialog.value, statusDialog.checked, false);
        myLibrary.push(book);
        updateItems();
        updateStorage();
    }else{
        console.log("Czegos brakuje")
    }
}

function clearDialog(){
    titleDialog.value = "";
    authorDialog.value = "";
    pagesDialog.value = "";
    statusDialog.checked = false;
}

function updateItems(){
    myLibrary.forEach(book => {
        if(!book.added){
            book.added = true;
            createItem(book);
        }
    })
}

function createItem(book){
    const itemClone = itemNode.cloneNode(true);

    itemClone.dataset.id = myLibrary.indexOf(book);
    const itemTitle = itemClone.querySelector(".title");
    const itemAuthor = itemClone.querySelector(".author");
    const itemPages = itemClone.querySelector(".pages");
    const itemBookId = itemClone.querySelector(".bookId");
    const itemReadButton = itemClone.querySelector(".changeStatus");
    const itemRemoveButton = itemClone.querySelector(".removeBook");

    itemTitle.textContent = book.title;
    itemAuthor.textContent = book.author;
    itemPages.textContent = book.pages;
    itemBookId.textContent = "00" + (myLibrary.indexOf(book) + 1);

    itemReadButton.addEventListener("click", () => {
        updateStatus(book, itemClone);
    })

    itemRemoveButton.addEventListener("click", () => {
        removeBook(book, itemClone);
    })

    if(book.status){
        itemClone.classList.toggle("read");
        itemClone.querySelector(".changeStatus").classList.toggle("btnRead");
    }

    container.appendChild(itemClone);
}

function updateStatus(book, item){
    book.status = book.status ? false : true; 
    item.classList.toggle("read");
    item.querySelector(".changeStatus").classList.toggle("btnRead");
    updateStorage();
}

function removeBook(book, item){
    container.removeChild(item); //Remove from UI
    myLibrary.splice(book, 1); //Remove from array
    updateBooks();
    updateStorage();
}

function updateBooks(){
    container.querySelectorAll(".item").forEach(item =>{
        myLibrary.forEach(book => {
            if(item.querySelector(".title").textContent === book.title){
                item.querySelector(".bookId").textContent = "00" + (myLibrary.indexOf(book) + 1);
            }
        })
    })
}

function updateStorage(){
    localStorage.setItem("books", JSON.stringify(myLibrary));
}

function checkStorage(){
    if (localStorage.length != 0){
        myLibrary = JSON.parse(localStorage.getItem("books"));
        myLibrary.forEach(book =>{
            book.added = false;
            updateItems();
        })
    }else{
        console.log("Nie ma nic")
    }
}