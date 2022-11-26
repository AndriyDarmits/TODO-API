import { asyncProvider, wait } from "../src/helpers.js";
import api from "./api.js";
import {
  insertAllTodosToHtml,
  insertSingleTodoToHtml,
  removeFromHtmlById,
  renderLoginPage,
  updateTodoState,
} from "./webApi.js";
// render login page
renderLoginPage();

// Написати функцію яка залогінює користувача, фетчить список ToDo елементів та добавляє їх на фронт (нові мають бути зверху)
window.login = async () => {
  event.preventDefault();
  //get gat from inputs
  const formData = new FormData(event.target);
  const loginData = {
    email: formData.get("email") || null,
    password: formData.get("password") || null,
  };

  //check is all field filled in
  if (Object.values(loginData).includes(null)) {
    alert("Please fill all fields");
    return;
  }
  // reset previous error
  api.error = false;
  // Писати код тут
  // we will lost a context so i should to bind this with api
  const loginBound = api.login.bind(api, loginData);
  await asyncProvider(loginBound);
  // if fail loggin in
  if (api.error) {
    alert("Not found user or incorrect password");
    return;
  }
  const allTodos = await api.fetchAllTodoItems();
  insertAllTodosToHtml(allTodos);
  console.log(allTodos);
};

// Написати функцію яка реєструє користувача, фетчить список ToDo елементів та добавляє їх на фронт (нові мають бути зверху)
window.register = async () => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const registerData = {
    name: formData.get("name") || null,
    email: formData.get("email") || null,
    password: formData.get("password") || null,
    age: formData.get("age") || null,
  };

  //check is all field filled in
  if (Object.values(registerData).includes(null)) {
    alert("Please fill all fields");
    return;
  }
  console.log(registerData);
  // reset previous error
  api.error = false;
  // Писати код тут
  const redisterBound = await api.register.bind(api, registerData);
  await asyncProvider(redisterBound);
  if (api.error) {
    alert("You has already registered");
    return;
  }
  const allTodos = await api.fetchAllTodoItems();
  insertAllTodosToHtml(allTodos);
};

window.logout = async () => {
  api.error = false;
  const logoutBound = api.logout.bind(api);
  await asyncProvider(logoutBound);
  // if fail loggin in
  if (api.error) {
    return;
  }
  renderLoginPage();
};

// Написати функцію яка добавляє ToDo елемент до API та фронта
window.addTodo = async () => {
  const input = document.getElementById("descriptionInput");
  // Отримуємо значення із інпута
  const description = input.value;
  if (!description.trim().length) {
    input.focus();
    return;
  }
  // Писати код тут
  const addedTodo = await api.addTodoItem(description);
  insertSingleTodoToHtml(addedTodo);
  input.value = "";
};

// Написати функцію(приймає id та completed - поточний стан ToDo елемента) яка модифікує Todo елемента на API та фронті.
window.modifyTodo = async (_id, completed) => {
  console.log(completed);
  // Писати код тут
  await api.updateTodoItem(_id, !completed);
  const data = await api.fetchAllTodoItems();
  console.log(data);
  updateTodoState(_id);
};

// Написати функцію(приймає id ) яка видаляє ToDo елемент із API та фронта.
window.removeTodo = async (_id) => {
  // Писати код тут
  await api.removeTodoItem(_id);
  removeFromHtmlById(_id);
};
