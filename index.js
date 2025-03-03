const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.querySelector('.to-do-list');

const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];


window.onload = () => {
    displayDate();
    displayItems();
};

addTaskBtn.addEventListener('click', () => {
    const item = document.getElementById('todoInput');
    const taskText = item.value.trim();

    if (taskText === "" || taskText.length < 3) {
            taskList.innerHTML = `<p class='errorText'>Erreur lors de la création de la tâche: Contenu insuffisant </p>`;
            return;
        };

    createItem(item);
});

function displayItems() {
    let items = ""
    for(let i = 0; i < itemsArray.length; i++) {
        items += `
            <div class="item">
        <div class="input-controller">
            <textarea disabled>${itemsArray[i]}</textarea>
            <div class="edit-controller">
                <i class="fa-solid fa-check deleteBtn"></i>
                <i class="fa-regular fa-pen-to-square editBtn"></i>
            </div>
        </div>
        <div class="update-controller">
            <button class="saveBtn">Sauvegarder</button>
            <button class="cancelBtn">Annuler</button>
        </div>
    </div>`
    }
    document.querySelector('.to-do-list').innerHTML = items;
    activateDeleteListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
}

function createItem(item) {
    itemsArray.push(item.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    location.reload();
}

function activateDeleteListeners() {
    let deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((db, i) => {
        db.addEventListener('click', () => {

            deleteItem(i);
        })
    })
}

function deleteItem(i) {
    itemsArray.splice(i, 1)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    location.reload();
}

function activateEditListeners() {
    const editBtn = document.querySelectorAll('.editBtn');
    const updateController = document.querySelectorAll('.update-controller');
    const inputs = document.querySelectorAll('.input-controller textarea');
    const editController = document.querySelectorAll('.edit-controller');
    editBtn.forEach((eb, i) => {
        eb.addEventListener('click', () => {
            updateController[i].style.display = "block";
            editController[i].style.display = "none";
            inputs[i].disabled = false;
        })
    })
}

function activateSaveListeners() {
    const saveBtn = document.querySelectorAll('.saveBtn');
    const inputs = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sb, i) => {
        sb.addEventListener('click', () => {
            updateItem(inputs[i].value, i)
        });
    });
}

function updateItem(text, i) {
    itemsArray[i] = text
    localStorage.setItem("items", JSON.stringify(itemsArray));
    location.reload();
}

function activateCancelListeners() {
    const cancelBtn = document.querySelectorAll('.cancelBtn');
    const updateController = document.querySelectorAll('.update-controller');
    const inputs = document.querySelectorAll('.input-controller textarea');
    const editController = document.querySelectorAll('.edit-controller');
    cancelBtn.forEach((eb, i) => {
        eb.addEventListener('click', () => {
            updateController[i].style.display = "none";
            editController[i].style.display = "block";
            inputs[i].disabled = true;
            updateItem(inputs[i].value, i)
        })
    })
}

function displayDate() {
    let date = new Date();
    date = date.toString().split(" ");
    document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3]
}