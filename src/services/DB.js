export default class DB {
  static setApiUrl(data) {
    this.apiUrl = data;
  }

  static async findAll() {
    const response = await fetch(this.apiUrl + "todos");
    return response.json();
  }

  static async create(data) {
    const response = await fetch(this.apiUrl + "todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: data.content,
        isCompleted: data.isCompleted,
      }),
    });
    return response.json();
  }

  static async deleteOne(id) {
    const response = await fetch(this.apiUrl + "contacts/" + id, {
      method: "DELETE",
    });
    return response.json();
  }

  static async updateOne(contact) {
    const response = await fetch(this.apiUrl + "todos/" + todos.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: todo.content,
        isCompleted: todo.isCompleted,
      }),
    });
    return response.json();
  }
}
