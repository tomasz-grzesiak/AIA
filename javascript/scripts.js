function addNewBook() {
    let row = document.createElement('tr');
    let authorCell = document.createElement('td');
    let authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorCell.appendChild(authorInput);
    
    let titleCell = document.createElement('td');
    let titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleCell.appendChild(titleInput);
    
    let buttonCell = document.createElement('td');
    let saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.innerText = 'Save';
    saveButton.onclick = saveBook;
    buttonCell.appendChild(saveButton);
    let removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.innerText = 'Remove';
    removeButton.onclick = removeBook;
    buttonCell.appendChild(removeButton);

    row.append(authorCell, titleCell, buttonCell);
    document.getElementById('tbody').appendChild(row);
}

function saveBook(event) {
    let row = event.srcElement.parentElement.parentElement;
    let button = event.srcElement;
    row.children[0].innerHTML = row.children[0].children[0].value;
    row.children[1].innerHTML = row.children[1].children[0].value;
    button.innerText = 'Edit';
    button.onclick = editBook
}

function editBook(event) {
    let row = event.srcElement.parentElement.parentElement;
    let button = event.srcElement;
    let authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.value = row.children[0].innerHTML;
    row.children[0].innerHTML = '';
    row.children[0].appendChild(authorInput);
    let titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = row.children[1].innerHTML;
    row.children[1].innerHTML = '';
    row.children[1].appendChild(titleInput);
    button.innerText = 'Save';
    button.onclick = saveBook
}

function removeBook(event) {
    event.srcElement.parentElement.parentElement.remove();
}