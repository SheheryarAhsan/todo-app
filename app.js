const todoForm = document.querySelector("form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

let allTodos = getTodos();
updateTodoListUI();

// When input is submitted by Button or Enter
todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTodo();
});
// storing input & creating todo item
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) { // check for empty input
        const todoObj = {
            text: todoText,
            completed: false
        };
        allTodos.push(todoObj);
        updateTodoListUI();
        saveTodos();
        todoInput.value = "";
    }
}
// Updating the UI, by adding items to list
function updateTodoListUI() {
    todoList.innerHTML = ""; // ! try another logic
    allTodos.forEach((todoText, todoIdx) => {
        todoItem = createTodoItem(todoText, todoIdx);
        todoList.append(todoItem);
    });
}
// creating and returning new todo item
function createTodoItem(todo, todoIdx) {
    const todoId = "todo-"+todoIdx;
    const li = document.createElement("li");
    li.className = "todo";
    const todoText = todo.text;
    li.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label for="${todoId}" class="custom-checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>`
    let deleteButton = li.querySelector(".delete-button");
    deleteButton.addEventListener("click", function() {
        deleteTodoItem(todoIdx);
    })
    let checkbox = li.querySelector("input");
    checkbox.addEventListener("change", function() {
        allTodos[todoIdx].completed = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = todo.completed;
    return li;
}

function deleteTodoItem(todoIdx) {
    allTodos = allTodos.filter((_, i) => i !== todoIdx);
    saveTodos();
    updateTodoListUI();
}

function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}