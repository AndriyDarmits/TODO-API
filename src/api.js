class Api {
  constructor() {
    this.url = "https://api-nodejs-todolist.herokuapp.com/";
    this.headers = { "Content-Type": "application/json" };
    this.error = false;
  }

  async register() {
    try {
      const res = await fetch(`${this.url}user/register`, {
        method: "POST",
        headers: this.headers,
        // Тут потрібно використовувати ваш name, email, age та password відповідно до прикладу у документації
        body: JSON.stringify({
          name: "Andrii Darmits",
          email: "darmirs99@gmail.com",
          password: "12345678",
          age: 20,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        this.headers.Authorization = `Bearer ${data.token}`;
        console.log(data);
      } else {
        throw new Error("Invalid authorization");
      }
    } catch (err) {
      console.log(err);
      if (err) {
        return false;
      }
    }
  }

  async login() {
    try {
      const res = await fetch(`${this.url}user/login`, {
        method: "POST",
        headers: this.headers,
        // Тут потрібно використовувати ваш email та password відповідно до прикладу у документації
        body: JSON.stringify({
          email: "darmirs99@gmail.com",
          password: "12345678",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        this.headers.Authorization = `Bearer ${data.token}`;
        console.log(data);
      } else {
        throw new Error("Invalid data");
      }
    } catch (err) {
      this.error = true;
      console.log(err);
    }
  }
  // TODO: not implemented yet
  async logout() {
    const res = await fetch(`${this.url}user/logout`, {
      method: "POST",
      headers: this.headers,
    });
    const data = await res.json();
    return data;
  }

  // Написати функцію яка повертає масив ToDo елементів із API
  async fetchAllTodoItems() {
    const res = await fetch(`${this.url}task`, {
      method: "GET",
      headers: this.headers,
    });
    const data = await res.json();
    return data.data;
  }

  // Написати функцію яка відсилає ToDo елемент до API та повертає результат
  async addTodoItem(todoDescription) {
    const description = {
      description: todoDescription,
    };
    const res = await fetch(`${this.url}task`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(description),
    });
    const data = await res.json();
    console.log(data);
    return data.data;
  }

  // Написати функцію яка видаляє ToDo елемент з API
  async removeTodoItem(id) {
    const res = await fetch(`${this.url}task/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
    const data = await res.json();
    console.log(data);
  }

  // Написати функцію яка оновляє ToDo елемент у API
  async updateTodoItem(id, completed) {
    const idCompleted = JSON.stringify({
      completed: completed,
    });
    const res = await fetch(`${this.url}task/${id}`, {
      method: "PUT",
      headers: this.headers,
      body: idCompleted,
    });
    const data = await res.json();
    console.log(data);
  }
}

export default new Api();
