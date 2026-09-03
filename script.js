const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!input.value.trim()) return;
  todos.push(input.value);
  localStorage.setItem("todos", JSON.stringify(todos));
  input.value = "";
  renderTodos();
});

function renderTodos() {
  ul.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    span.textContent = todo;
    span.classList.add("span");

    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "❌";

    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.textContent = "Edit";

    li.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) {
        deleteButton(index);
      }
      if (e.target.classList.contains("editBtn")) {
        editButton(index);
      }
      if (e.target.classList.contains("span")) {
        e.target.parentElement.classList.toggle("completed");
      }
    });

    const buttons = document.createElement("div");
    buttons.append(deleteBtn, editBtn);
    li.append(span, buttons);
    ul.appendChild(li);
  });
}

function deleteButton(index) {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function editButton(index) {
  input.value = todos[index];
  input.focus();
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

renderTodos();
