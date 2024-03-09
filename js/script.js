// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const filterSelect = document.querySelector("#filter-select");
const searchInput = document.querySelector("#search-input");


let oldInputValue;

// Funções
const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);

    todoInput.value = '';
    todoInput.focus();

    console.log(todo);
}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })
}

const filterChange = (filter) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach(todo => {
        if (filter === "all") {
            todo.classList.remove("hide");
        } else if (filter === "done") {
            if (todo.classList.contains("done")){
                todo.classList.remove("hide");
            } else {
                todo.classList.add("hide");
            }
        } else if (filter === "todo") {
            if (!todo.classList.contains("done")) {
                todo.classList.remove("hide");
            } else {
                todo.classList.add("hide");
            }
        }
    });
}

const searchChange = (search) => {
    const todos = document.querySelectorAll(".todo");

    console.log("eai search")

    todos.forEach(todo => {
        const title = todo.querySelector("h3").innerText.toLowerCase();

        if(title.includes(search)) {
            todo.classList.remove("hide");
        } else {
            todo.classList.add("hide");
        }
    });
}



// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue) { 
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms()

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
});

filterSelect.addEventListener("change", (e) => {
    e.preventDefault();
    
    const selectedValue = filterSelect.value;

    if(selectedValue) {
        filterChange(selectedValue);
    }
});

searchInput.addEventListener("input", (e) => {
    e.preventDefault();

    const searchText = searchInput.value.toLowerCase();

    if (searchText) {
        searchChange(searchText);
    }
})