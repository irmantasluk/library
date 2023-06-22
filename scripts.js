let myLibrary = [];
let book;
const addBookBtn = document.querySelector('#addBookBtn');
const cancelBtn = document.querySelector('#cancel');
const form = document.querySelector('#addBookForm');
const titleTxt = document.querySelector('#title');
const authorTxt = document.querySelector('#author');
const pagesTxt = document.querySelector('#pages');
const isReadChk = document.querySelector('#isReadChk');
const addBookMdl = document.querySelector('#addBookMdl');
const modalOverlay = document.querySelector('.modal-overlay');

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.toggleReadStatus = function(){
    this.read = !this.read;
}

addBookBtn.addEventListener('click', displayModal);
titleTxt.addEventListener('input', validate);
authorTxt.addEventListener('input', validate);
pagesTxt.addEventListener('input', validate);
form.addEventListener('submit', submitForm);
cancelBtn.addEventListener('click', hideModal);


function validate(e){
    e.target.classList.remove('invalid');
    
    if(e.target.name === 'title') {
        titleTxt.setAttribute('placeholder', 'Title');
    } else if( e.target.name === 'author') {
        authorTxt.setAttribute('placeholder', 'Author');
    } else if(e.target.name === 'pages') {
        pagesTxt.setAttribute('placeholder', 'Number of Pages');
    }

    if(!e.target.validity.valid){
        showError();
    }
}

function showError(){
    if(!titleTxt.validity.valid){
        if(titleTxt.validity.valueMissing){
            titleTxt.classList.add('invalid');
            titleTxt.setAttribute('placeholder', 'Title is required');
        }
    }
    if(!authorTxt.validity.valid){
        if(authorTxt.validity.valueMissing){
            authorTxt.classList.add('invalid');
            authorTxt.setAttribute('placeholder', 'Author is required');
        }
    }
    if(!pagesTxt.validity.valid){
        if(pagesTxt.validity.valueMissing){
            pagesTxt.classList.add('invalid');
            pagesTxt.setAttribute('placeholder', 'Number of pages is required');
        }
    }
}

// Submit a form
function submitForm(e){
    e.preventDefault();
    if(!titleTxt.validity.valid || !authorTxt.validity.valid || !pagesTxt.validity.valid){
        showError();
    } else {
        book = new Book(titleTxt.value, authorTxt.value, pagesTxt.value, isReadChk.checked);
        myLibrary.push(book);
        clearForm();
        generateCards();
        hideModal();
    }
}

function displayModal(){
    addBookMdl.style.display = 'block';
    modalOverlay.style.display = 'flex';
}

function clearForm(){
    titleTxt.value = '';
    authorTxt.value = '';
    pagesTxt.value = '';
    isReadChk.checked = false;
}

function hideModal(){
    addBookMdl.style.display = 'none';
    modalOverlay.style.display = 'none';
    clearForm();
}


function deleteBook(){
    const removeBookBtn = document.querySelectorAll('.removeBook');
    removeBookBtn.forEach(elem => {
        elem.addEventListener('click', function(e){
            myLibrary.splice(parseInt(e.target.parentNode.dataset.book), 1);
            generateCards();
        });
    })
}

function toggleRead(e, status){
    myLibrary[e.target.parentNode.dataset.book].read = status;
}


function generateCards(){
    const container = document.querySelector('.container');
    container.innerHTML = '';

    for(let i = 0; i < myLibrary.length; i++){
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-book', i);

        const title = document.createElement('h3');
        title.textContent = myLibrary[i].title;

        const author = document.createElement('p');
        author.classList.add('author');
        author.textContent = myLibrary[i].author;
        
        const pages = document.createElement('p');
        pages.classList.add('number-of-pages');
        pages.textContent = myLibrary[i].pages;
        
        const readBtn = document.createElement('button');
        readBtn.setAttribute('type', 'button');
        readBtn.setAttribute('id', 'readBtn');
        readBtn.setAttribute('class', 'btn-primary');

        if(myLibrary[i].read){
            readBtn.textContent = 'Read';
            readBtn.classList.add('read');
            readBtn.classList.remove('not-read');
        } else {
            readBtn.textContent = 'Not Read';
            readBtn.classList.add('not-read');
            readBtn.classList.remove('read');
        }

        // Toggle Read button
        readBtn.addEventListener('click', function(e){
            let status = false;
            if(readBtn.textContent === 'Read'){
                readBtn.textContent = 'Not Read';
                readBtn.classList.add('not-read');
                readBtn.classList.remove('read');
                status = false;
                toggleRead(e, status);
            } else {
                readBtn.textContent = 'Read';
                readBtn.classList.add('read');
                readBtn.classList.remove('not-read');
                status = true;
                toggleRead(e, status);
            }
        });

        const removeBookBtn = document.createElement('button');
        removeBookBtn.setAttribute('type', 'button');
        removeBookBtn.setAttribute('class', 'removeBook btn-red');
        removeBookBtn.textContent = 'Remove';

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readBtn);
        card.appendChild(removeBookBtn);

        container.appendChild(card);
    }

    deleteBook();
    console.log(myLibrary);
}

generateCards();