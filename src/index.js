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
  // Писати код тут
  // we will lost a context so i should to bind this with api
  const loginBound = api.login.bind(api);
  await asyncProvider(loginBound);
  // if fail loggin in
  if (api.error) {
    return;
  }
  const allTodos = await api.fetchAllTodoItems();
  insertAllTodosToHtml(allTodos);
  console.log(allTodos);
};

// Написати функцію яка реєструє користувача, фетчить список ToDo елементів та добавляє їх на фронт (нові мають бути зверху)
window.register = async () => {
  // Писати код тут
  const data = await api.register();
  console.log(data);
  if (!data) {
    alert("You has already registered");
    return;
  }
  const allTodos = await api.fetchAllTodoItems();
  insertAllTodosToHtml(allTodos);
};
window.logout = async () => {
  const isLoggedOut = await api.logout();
  if (isLoggedOut.success) {
    renderLoginPage();
  }
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
