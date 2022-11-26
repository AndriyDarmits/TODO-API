// Функція повертає HTML темплейт ToDo елемента (Використовувати не потрібно)
export const renderLoginPage = () => {
  const loginContent = `
<div id="app" class="mainContainer">
  <div class = "logInUpBlock">
     <h2 className="logIn-title">Log in</h2>
    <form class = "login"  onsubmit="login()" >
      <input type="email" name = "email" placeholder = "Email..."/>
      <input type="password" name="password" placeholder = "Password..."/>
      <button class="button" type = "submit">Login</button>
    </form>
    <h2 className="signup-title">Sign up</h2>
    <form class = "signup"  onsubmit="register()" >
      <input type="text" name = "name" placeholder = "Name..."/>
      <input type="email" name = "email" placeholder = "Email..."/>
      <input type="password" name = "password" placeholder = "Password..."/>
      <input type="text" name = "age" placeholder = "Gge..."/>
      <button class="button" type = "submit">Register</button>
    </form>
  </div>
</div>
<div id="loader" class="loaderContainer hidden">
  <div class="loaderIcon"></div>
</div>`;
  document.body.innerHTML = loginContent;
};
const todoHTML = ({ _id, description, completed }) =>
  `<div id="${_id}" class="todoItem ${
    completed ? "todoCompleted" : ""
  }"><p onclick="modifyTodo('${_id}', ${completed})" >${description}</p> <button class="removeButton" onclick="removeTodo('${_id}')"><span>x</span></button></div>`;

// Функція приймає масив ToDo елементів та вставляє їх у html
export const insertAllTodosToHtml = (todos) => {
  const container = document.getElementById("app");

  const todoInput = `<div class="inputContainer"><input class="input" id="descriptionInput" />
  <button class="button" onclick="addTodo()">
    Add todo
  </button></div>`;
  const logout = `<button class = "logout"  onclick="logout()">Logout</button>`;

  const todosHTML = todos.reduce((acc, todo) => {
    acc += todoHTML(todo);
    return acc;
  }, "");
  container.innerHTML = `<div class="todoListContainer"><div class="todoListHeader">Todo List</div><div id="todoList">${todosHTML}</div>${todoInput}${logout}</div>`;
};

// Функція приймає 1 ToDo елемент та вставляє його зверху у html
export const insertSingleTodoToHtml = (todo) => {
  const container = document.getElementById("todoList");

  container.innerHTML = `${todoHTML(todo)}${container.innerHTML}`;
};

// Функція видаляє ToDo елемент по полю id із html
export const removeFromHtmlById = (_id) => {
  const todoItemContainer = document.getElementById(_id);
  todoItemContainer.remove();
};

// Функція оновлює ToDo елемент по полю id (робить completed/not completed)
export const updateTodoState = (_id) => {
  const container = document.getElementById(_id);
  const pTag = container.children[0];
  if (container.classList.contains("todoCompleted")) {
    pTag.onclick = function () {
      window.modifyTodo(_id, false);
    };
  } else {
    pTag.onclick = function () {
      window.modifyTodo(_id, true);
    };
  }
  container.classList.toggle("todoCompleted");
};

// Івент який додає іконку лоадера (запустити на початку з’єднання з сервером)
export const fetchStart = new Event("fetchStart", {
  view: document,
  bubbles: true,
  cancelable: false,
});
// Івент який видаляє іконку лоадера (запустити після отримання результату з сервера)
export const fetchEnd = new Event("fetchEnd", {
  view: document,
  bubbles: true,
  cancelable: false,
});

// Лістенери для лоадера (Використовувати не потрібно)
document.addEventListener("fetchStart", function () {
  document.getElementById("loader").classList.add("shown");
});
document.addEventListener("fetchEnd", function () {
  document.getElementById("loader").classList.remove("shown");
});
